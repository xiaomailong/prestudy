#include <limits.h>
#include <string>
#include <iostream>
#include <memory>
#include <set>

#include <gtest/gtest.h>

#include <sgcc.hpp>

class Incomplete;

Incomplete * get_ptr(sgcc::shared_ptr<Incomplete>& incomplete )
{
  return incomplete.get();
}

template<class T>
void ck( const T* v1, T v2 ) { EXPECT_EQ( *v1, v2 ); }

namespace {
  int UDTS_use_count;  // independent of pointer maintained counts
  }

//  user defined type  -------------------------------------------------------//

class UDTS {
  long value_;
 public:
  explicit UDTS( long value=0 ) : value_(value) { ++UDTS_use_count; }
  ~UDTS() {
    --UDTS_use_count;
    std::cout << "UDT with value " << value_ << " being destroyed\n";
    }
  long value() const { return value_; }
  void value( long v ) { value_ = v;; }
  };  // UDT

//  tests on incomplete types  -----------------------------------------------//

//  Certain smart pointer operations are specified to work on incomplete types,
//  and some uses depend upon this feature.  These tests verify compilation
//  only - the functions aren't actually invoked.

class Incomplete;

Incomplete * check_incomplete( sgcc::scoped_ptr<Incomplete>& incomplete )
{
  return incomplete.get();
}

Incomplete * check_incomplete( sgcc::shared_ptr<Incomplete>& incomplete,
                               sgcc::shared_ptr<Incomplete>& i2 )
{
  incomplete.swap(i2);
  std::cout << incomplete.use_count() << ' ' << incomplete.unique() << '\n';
  return incomplete.get();
}

//  This isn't a very systematic test; it just hits some of the basics.

TEST(sgccTest, SmartPtr)
{
    EXPECT_EQ( UDTS_use_count, 0 );  // reality check

    //  test scoped_ptr with a built-in type
    long * lp = new long;
    sgcc::scoped_ptr<long> sp ( lp );
    EXPECT_EQ( sp.get(), lp );
    EXPECT_EQ( lp, sp.get() );
    EXPECT_EQ( &*sp, lp );

    *sp = 1234568901L;
    EXPECT_EQ( *sp, 1234568901L );
    EXPECT_EQ( *lp, 1234568901L );
    ck( static_cast<long*>(sp.get()), 1234568901L );
    ck( lp, *sp );

    sp.reset();
    //EXPECT_EQ(sp.get(), 0);

    //  test scoped_ptr with a user defined type
    sgcc::scoped_ptr<UDTS> udt_sp ( new UDTS( 999888777 ) );
    EXPECT_EQ( udt_sp->value(), 999888777 );
    udt_sp.reset();
    udt_sp.reset( new UDTS( 111222333 ) );
    EXPECT_EQ( udt_sp->value(), 111222333 );
    udt_sp.reset( new UDTS( 333222111 ) );
    EXPECT_EQ( udt_sp->value(), 333222111 );

    //  test scoped_array with a build-in type
    char * sap = new char [ 100 ];
    sgcc::scoped_array<char> sa ( sap );
    EXPECT_EQ( sa.get(), sap );
    EXPECT_EQ( sap, sa.get() );

    strcpy( sa.get(), "Hot Dog with mustard and relish" );
    EXPECT_EQ( strcmp( sa.get(), "Hot Dog with mustard and relish" ), 0 );
    EXPECT_EQ( strcmp( sap, "Hot Dog with mustard and relish" ), 0 );

    EXPECT_EQ( sa[0], 'H' );
    EXPECT_EQ( sa[30], 'h' );

    sa[0] = 'N';
    sa[4] = 'd';
    EXPECT_EQ( strcmp( sap, "Not dog with mustard and relish" ), 0 );

    sa.reset();
    //EXPECT_EQ( sa.get(), 0 );

    //  test shared_ptr with a built-in type
    int * ip = new int;
    sgcc::shared_ptr<int> cp ( ip );
    EXPECT_EQ( ip, cp.get() );
    EXPECT_EQ( cp.use_count(), 1 );

    *cp = 54321;
    EXPECT_EQ( *cp, 54321 );
    EXPECT_EQ( *ip, 54321 );
    ck( static_cast<int*>(cp.get()), 54321 );
    ck( static_cast<int*>(ip), *cp );

    sgcc::shared_ptr<int> cp2 ( cp );
    EXPECT_EQ( ip, cp2.get() );
    EXPECT_EQ( cp.use_count(), 2 );
    EXPECT_EQ( cp2.use_count(), 2 );

    EXPECT_EQ( *cp, 54321 );
    EXPECT_EQ( *cp2, 54321 );
    ck( static_cast<int*>(cp2.get()), 54321 );
    ck( static_cast<int*>(ip), *cp2 );

    sgcc::shared_ptr<int> cp3 ( cp );
    EXPECT_EQ( cp.use_count(), 3 );
    EXPECT_EQ( cp2.use_count(), 3 );
    EXPECT_EQ( cp3.use_count(), 3 );
    cp.reset();
    EXPECT_EQ( cp2.use_count(), 2 );
    EXPECT_EQ( cp3.use_count(), 2 );
    cp.reset( new int );
    *cp =  98765;
    EXPECT_EQ( *cp, 98765 );
    *cp3 = 87654;
    EXPECT_EQ( *cp3, 87654 );
    EXPECT_EQ( *cp2, 87654 );
    cp.swap( cp3 );
    EXPECT_EQ( *cp, 87654 );
    EXPECT_EQ( *cp2, 87654 );
    EXPECT_EQ( *cp3, 98765 );
    cp.swap( cp3 );
    EXPECT_EQ( *cp, 98765 );
    EXPECT_EQ( *cp2, 87654 );
    EXPECT_EQ( *cp3, 87654 );
    cp2 = cp2;
    EXPECT_EQ( cp2.use_count(), 2 );
    EXPECT_EQ( *cp2, 87654 );
    cp = cp2;
    EXPECT_EQ( cp2.use_count(), 3 );
    EXPECT_EQ( *cp2, 87654 );
    EXPECT_EQ( cp.use_count(), 3 );
    EXPECT_EQ( *cp, 87654 );

#if defined( sgcc_NO_ARGUMENT_DEPENDENT_LOOKUP )
    using sgcc::swap;
#endif

    sgcc::shared_ptr<int> cp4;
    swap( cp2, cp4 );
    EXPECT_EQ( cp4.use_count(), 3 );
    EXPECT_EQ( *cp4, 87654 );
    //EXPECT_EQ( cp2.get(), 0 );

    std::set< sgcc::shared_ptr<int> > scp;
    scp.insert(cp4);
    EXPECT_NE( scp.find(cp4), scp.end() );
    EXPECT_EQ( scp.find(cp4), scp.find( sgcc::shared_ptr<int>(cp4) ) );

    //  test shared_array with a built-in type
    char * cap = new char [ 100 ];
    sgcc::shared_array<char> ca ( cap );
    EXPECT_EQ( ca.get(), cap );
    EXPECT_EQ( cap, ca.get() );
    EXPECT_EQ( &ca[0], cap );

    strcpy( ca.get(), "Hot Dog with mustard and relish" );
    EXPECT_EQ( strcmp( ca.get(), "Hot Dog with mustard and relish" ), 0 );
    EXPECT_EQ( strcmp( cap, "Hot Dog with mustard and relish" ), 0 );

    EXPECT_EQ( ca[0], 'H' );
    EXPECT_EQ( ca[30], 'h' );

    sgcc::shared_array<char> ca2 ( ca );
    sgcc::shared_array<char> ca3 ( ca2 );

    ca[0] = 'N';
    ca[4] = 'd';
    EXPECT_EQ( strcmp( ca.get(), "Not dog with mustard and relish" ), 0 );
    EXPECT_EQ( strcmp( ca2.get(), "Not dog with mustard and relish" ), 0 );
    EXPECT_EQ( strcmp( ca3.get(), "Not dog with mustard and relish" ), 0 );
    EXPECT_EQ( ca.use_count(), 3 );
    EXPECT_EQ( ca2.use_count(), 3 );
    EXPECT_EQ( ca3.use_count(), 3 );
    ca2.reset();
    EXPECT_EQ( ca.use_count(), 2 );
    EXPECT_EQ( ca3.use_count(), 2 );
    EXPECT_EQ( ca2.use_count(), 1 );

    ca.reset();
    //EXPECT_EQ( ca.get(), 0 );

    sgcc::shared_array<char> ca4;
    swap( ca3, ca4 );
    EXPECT_EQ( ca4.use_count(), 1 );
    EXPECT_EQ( strcmp( ca4.get(), "Not dog with mustard and relish" ), 0 );
    //EXPECT_EQ( ca3.get(), 0 );

    std::set< sgcc::shared_array<char> > sca;
    sca.insert(ca4);
    EXPECT_NE( sca.find(ca4), sca.end() );
    EXPECT_EQ( sca.find(ca4), sca.find( sgcc::shared_array<char>(ca4) ) );

    //  test shared_array with user defined type
    sgcc::shared_array<UDTS> udta ( new UDTS[3] );

    udta[0].value( 111 );
    udta[1].value( 222 );
    udta[2].value( 333 );
    sgcc::shared_array<UDTS> udta2 ( udta );

    EXPECT_EQ( udta[0].value(), 111 );
    EXPECT_EQ( udta[1].value(), 222 );
    EXPECT_EQ( udta[2].value(), 333 );
    EXPECT_EQ( udta2[0].value(), 111 );
    EXPECT_EQ( udta2[1].value(), 222 );
    EXPECT_EQ( udta2[2].value(), 333 );
    udta2.reset();
    //EXPECT_EQ( udta2.get(), 0 );
    EXPECT_EQ( udta.use_count(), 1 );
    EXPECT_EQ( udta2.use_count(), 1 );

    EXPECT_EQ( UDTS_use_count, 4 );  // reality check

    //  test shared_ptr with a user defined type
    UDTS * up = new UDTS;
    sgcc::shared_ptr<UDTS> sup ( up );
    EXPECT_EQ( up, sup.get() );
    EXPECT_EQ( sup.use_count(), 1 );

    sup->value( 54321 ) ;
    EXPECT_EQ( sup->value(), 54321 );
    EXPECT_EQ( up->value(), 54321 );

    sgcc::shared_ptr<UDTS> sup2;
    sup2 = sup;
    EXPECT_EQ( sup2->value(), 54321 );
    EXPECT_EQ( sup.use_count(), 2 );
    EXPECT_EQ( sup2.use_count(), 2 );
    sup2 = sup2;
    EXPECT_EQ( sup2->value(), 54321 );
    EXPECT_EQ( sup.use_count(), 2 );
    EXPECT_EQ( sup2.use_count(), 2 );

    std::cout << "OK\n";

    new char[12345]; // deliberate memory leak to verify leaks detected
}
