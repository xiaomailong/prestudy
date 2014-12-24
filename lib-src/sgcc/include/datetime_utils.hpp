/*
 *****************************************************************
 *                    Date Time Parsing Utils                    *
 *                                                               *
 * Author: Arash Partow (2006)                                   *
 * URL: http://www.partow.net/programming/datetime/index.html    *
 *                                                               *
 * Copyright notice:                                             *
 * Free use of the Date Time Parsing Utils Library is permitted  *
 * under the guidelines and in accordance with the most current  *
 * version of the Common Public License.                         *
 * http://www.opensource.org/licenses/cpl1.0.php                 *
 *                                                               *
 *****************************************************************
*/


#ifndef INCLUDE_DATETIME_UTILS_HPP
#define INCLUDE_DATETIME_UTILS_HPP

#include <iostream>
#include <string>

#include "strtk.hpp"


namespace dt_utils
{
   struct datetime
   {
      unsigned short year;
      unsigned short month;
      unsigned short day;
      unsigned short hour;
      unsigned short minute;
      unsigned short second;
      unsigned short millisecond;

      void clear()
      {
         year        = 0;
         month       = 0;
         day         = 0;
         hour        = 0;
         minute      = 0;
         second      = 0;
         millisecond = 0;
      }
   };

   /* YYYYMMDD    */ struct date_format0 { date_format0(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYYDDMM    */ struct date_format1 { date_format1(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY/MM/DD  */ struct date_format2 { date_format2(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY/DD/MM  */ struct date_format3 { date_format3(datetime& d) : dt(d) {} datetime& dt; };
   /* DD/MM/YYYY  */ struct date_format4 { date_format4(datetime& d) : dt(d) {} datetime& dt; };
   /* MM/DD/YYYY  */ struct date_format5 { date_format5(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY-MM-DD  */ struct date_format6 { date_format6(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY-DD-MM  */ struct date_format7 { date_format7(datetime& d) : dt(d) {} datetime& dt; };
   /* DD-MM-YYYY  */ struct date_format8 { date_format8(datetime& d) : dt(d) {} datetime& dt; };
   /* MM-DD-YYYY  */ struct date_format9 { date_format9(datetime& d) : dt(d) {} datetime& dt; };

   /* HH:MM:SS.mss */ struct time_format0 { time_format0(datetime& d) : dt(d) {} datetime& dt; };
   /* HH:MM:SS     */ struct time_format1 { time_format1(datetime& d) : dt(d) {} datetime& dt; };
   /* HH MM SS mss */ struct time_format2 { time_format2(datetime& d) : dt(d) {} datetime& dt; };
   /* HH MM SS     */ struct time_format3 { time_format3(datetime& d) : dt(d) {} datetime& dt; };

   /* YYYYMMDD HH:MM:SS.mss   */ struct datetime_format00 { datetime_format00(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY/MM/DD HH:MM:SS.mss */ struct datetime_format01 { datetime_format01(datetime& d) : dt(d) {} datetime& dt; };
   /* DD/MM/YYYY HH:MM:SS.mss */ struct datetime_format02 { datetime_format02(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYYMMDD HH:MM:SS       */ struct datetime_format03 { datetime_format03(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY/MM/DD HH:MM:SS     */ struct datetime_format04 { datetime_format04(datetime& d) : dt(d) {} datetime& dt; };
   /* DD/MM/YYYY HH:MM:SS     */ struct datetime_format05 { datetime_format05(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY-MM-DD HH:MM:SS.mss */ struct datetime_format06 { datetime_format06(datetime& d) : dt(d) {} datetime& dt; };
   /* DD-MM-YYYY HH:MM:SS.mss */ struct datetime_format07 { datetime_format07(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY-MM-DD HH:MM:SS     */ struct datetime_format08 { datetime_format08(datetime& d) : dt(d) {} datetime& dt; };
   /* DD-MM-YYYY HH:MM:SS     */ struct datetime_format09 { datetime_format09(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY-MM-DDTHH:MM:SS     */ struct datetime_format10 { datetime_format10(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYY-MM-DDTHH:MM:SS.mss */ struct datetime_format11 { datetime_format11(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYYMMDDTHH:MM:SS       */ struct datetime_format12 { datetime_format12(datetime& d) : dt(d) {} datetime& dt; };
   /* YYYYMMDDTHH:MM:SS.mss   */ struct datetime_format13 { datetime_format13(datetime& d) : dt(d) {} datetime& dt; };


   void test()
   {
      {
         std::string data = "20060304";
         dt_utils::datetime dt;
         dt_utils::date_format0 dtd0(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd0)) std::cout << "ERROR - date_format0 YYYYMMDD\n";
         if (dt.year  != 2006)  std::cout << "ERROR - date_format0 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - date_format0 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - date_format0 - day  \n";
      }

      {
         std::string data = "20060403";
         dt_utils::datetime dt;
         dt_utils::date_format1 dtd1(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd1)) std::cout << "ERROR - date_format1 YYYYDDMM\n";
         if (dt.year  != 2006)  std::cout << "ERROR - date_format1 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - date_format1 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - date_format1 - day  \n";
      }

      {
         std::string data = "2006/03/04";
         dt_utils::datetime dt;
         dt_utils::date_format2 dtd2(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd2)) std::cout << "ERROR - date_format2 YYYY/MM/DD\n";
         if (dt.year  != 2006)  std::cout << "ERROR - date_format2 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - date_format2 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - date_format2 - day  \n";
      }

      {
         std::string data = "2006/04/03";
         dt_utils::datetime dt;
         dt_utils::date_format3 dtd3(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd3)) std::cout << "ERROR - date_format3 YYYY/DD/MM\n";
         if (dt.year  != 2006)  std::cout << "ERROR - date_format3 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - date_format3 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - date_format3 - day  \n";
      }

      {
         std::string data = "04/03/2006";
         dt_utils::datetime dt;
         dt_utils::date_format4 dtd4(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd4)) std::cout << "ERROR - date_format4 DD/MM/YYYY\n";
         if (dt.year  != 2006)  std::cout << "ERROR - date_format4 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - date_format4 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - date_format4 - day  \n";
      }

      {
         std::string data = "03/04/2006";
         dt_utils::datetime dt;
         dt_utils::date_format5 dtd5(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd5)) std::cout << "ERROR - date_format5 MM/DD/YYYY\n";
         if (dt.year  != 2006)  std::cout << "ERROR - data_format5 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - data_format5 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - data_format5 - day  \n";
      }

      {
         std::string data = "2006-03-04";
         dt_utils::datetime dt;
         dt_utils::date_format6 dtd6(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd6)) std::cout << "ERROR - date_format6 YYYY-MM-DD\n";
         if (dt.year  != 2006)  std::cout << "ERROR - date_format6 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - date_format6 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - date_format6 - day  \n";
      }

      {
         std::string data = "2006-04-03";
         dt_utils::datetime dt;
         dt_utils::date_format7 dtd7(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd7)) std::cout << "ERROR - date_format7 YYYY-DD-MM\n";
         if (dt.year  != 2006)  std::cout << "ERROR - date_format7 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - date_format7 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - date_format7 - day  \n";
      }

      {
         std::string data = "04-03-2006";
         dt_utils::datetime dt;
         dt_utils::date_format8 dtd8(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd8)) std::cout << "ERROR - date_format8 DD-MM-YYYY\n";
         if (dt.year  != 2006)  std::cout << "ERROR - date_format8 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - date_format8 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - date_format8 - day  \n";
      }

      {
         std::string data = "03-04-2006";
         dt_utils::datetime dt;
         dt_utils::date_format9 dtd9(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtd9)) std::cout << "ERROR - date_format9 MM-DD-YYYY\n";
         if (dt.year  != 2006)  std::cout << "ERROR - data_format9 - year \n";
         if (dt.month !=    3)  std::cout << "ERROR - data_format9 - month\n";
         if (dt.day   !=    4)  std::cout << "ERROR - data_format9 - day  \n";
      }

      {
         std::string data = "13:27:54.123";
         dt_utils::datetime dt;
         dt_utils::time_format0 dtt0(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtt0)) std::cout << "ERROR - time_format0 HH:MM:SS.MSS\n";
         if (dt.hour        !=  13) std::cout << "ERROR - time_format0 - hour       \n";
         if (dt.minute      !=  27) std::cout << "ERROR - time_format0 - minute     \n";
         if (dt.second      !=  54) std::cout << "ERROR - time_format0 - second     \n";
         if (dt.millisecond != 123) std::cout << "ERROR - time_format0 - millisecond\n";
      }

      {
         std::string data = "13:27:54";
         dt_utils::datetime dt;
         dt_utils::time_format1 dtt1(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtt1)) std::cout << "ERROR - time_format1 HH:MM:SS\n";
         if (dt.hour        !=  13) std::cout << "ERROR - time_format1 - hour       \n";
         if (dt.minute      !=  27) std::cout << "ERROR - time_format1 - minute     \n";
         if (dt.second      !=  54) std::cout << "ERROR - time_format1 - second     \n";
      }

      {
         std::string data = "13 27 54 123";
         dt_utils::datetime dt;
         dt_utils::time_format2 dtt2(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtt2)) std::cout << "ERROR - time_format2 HH MM SS MSS\n";
         if (dt.hour        !=  13) std::cout << "ERROR - time_format2 - hour       \n";
         if (dt.minute      !=  27) std::cout << "ERROR - time_format2 - minute     \n";
         if (dt.second      !=  54) std::cout << "ERROR - time_format2 - second     \n";
         if (dt.millisecond != 123) std::cout << "ERROR - time_format2 - millisecond\n";
      }

      {
         std::string data = "13 27 54";
         dt_utils::datetime dt;
         dt_utils::time_format3 dtt3(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dtt3)) std::cout << "ERROR - time_format3 HH MM SS\n";
         if (dt.hour        !=  13) std::cout << "ERROR - time_format3 - hour       \n";
         if (dt.minute      !=  27) std::cout << "ERROR - time_format3 - minute     \n";
         if (dt.second      !=  54) std::cout << "ERROR - time_format3 - second     \n";
      }

      {
         std::string data = "20060304 13:27:54.123";
         dt_utils::datetime dt;
         dt_utils::datetime_format00 dt0(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt0)) std::cout << "ERROR - datetime_format00 YYYYMMDD HH:MM:SS.MSS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format00 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format00 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format00 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format00 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format00 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format00 - second     \n";
         if (dt.millisecond !=  123) std::cout << "ERROR - datetime_format00 - millisecond\n";
      }

      {
         std::string data = "2006/03/04 13:27:54.123";
         dt_utils::datetime dt;
         dt_utils::datetime_format01 dt1(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt1)) std::cout << "ERROR - datetime_format01 YYYY/MM/DD HH:MM:SS.MSS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format01 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format01 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format01 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format01 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format01 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format01 - second     \n";
         if (dt.millisecond !=  123) std::cout << "ERROR - datetime_format01 - millisecond\n";
      }

      {
         std::string data = "04/03/2006 13:27:54.123";
         dt_utils::datetime dt;
         dt_utils::datetime_format02 dt2(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt2)) std::cout << "ERROR - datetime_format02 DD/MM/YYYY HH:MM:SS.MSS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format02 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format02 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format02 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format02 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format02 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format02 - second     \n";
         if (dt.millisecond !=  123) std::cout << "ERROR - datetime_format02 - millisecond\n";
      }

      {
         std::string data = "20060304 13:27:54";
         dt_utils::datetime dt;
         dt_utils::datetime_format03 dt3(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt3)) std::cout << "ERROR - datetime_format03 YYYYMMDD HH:MM:SS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format03 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format03 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format03 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format03 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format03 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format03 - second     \n";
      }

      {
         std::string data = "2006/03/04 13:27:54";
         dt_utils::datetime dt;
         dt_utils::datetime_format04 dt4(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt4)) std::cout << "ERROR - datetime_format04 YYYY/MM/DD HH:MM:SS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format04 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format04 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format04 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format04 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format04 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format04 - second     \n";
      }

      {
         std::string data = "04/03/2006 13:27:54";
         dt_utils::datetime dt;
         dt_utils::datetime_format05 dt5(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt5)) std::cout << "ERROR - datetime_format05 DD/MM/YYYY HH:MM:SS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format05 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format05 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format05 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format05 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format05 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format05 - second     \n";
      }

      {
         std::string data = "2006-03-04 13:27:54.123";
         dt_utils::datetime dt;
         dt_utils::datetime_format06 dt6(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt6)) std::cout << "ERROR - datetime_format06 YYYY-MM-DD HH:MM:SS.MSS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format06 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format06 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format06 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format06 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format06 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format06 - second     \n";
         if (dt.millisecond !=  123) std::cout << "ERROR - datetime_format06 - millisecond\n";
      }

      {
         std::string data = "04-03-2006 13:27:54.123";
         dt_utils::datetime dt;
         dt_utils::datetime_format07 dt7(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt7)) std::cout << "ERROR - datetime_format07 DD-MM-YYYY HH:MM:SS.MSS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format07 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format07 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format07 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format07 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format07 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format07 - second     \n";
         if (dt.millisecond !=  123) std::cout << "ERROR - datetime_format07 - millisecond\n";
      }

      {
         std::string data = "2006-03-04 13:27:54";
         dt_utils::datetime dt;
         dt_utils::datetime_format08 dt8(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt8)) std::cout << "ERROR - datetime_format08 YYYY-MM-DD HH:MM:SS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format08 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format08 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format08 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format08 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format08 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format08 - second     \n";
      }

      {
         std::string data = "04-03-2006 13:27:54";
         dt_utils::datetime dt;
         dt_utils::datetime_format09 dt9(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt9)) std::cout << "ERROR - datetime_format09 DD-MM-YYYY HH:MM:SS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format09 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format09 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format09 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format09 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format09 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format09 - second     \n";
      }

      {
         std::string data = "2006-03-04T13:27:54";
         dt_utils::datetime dt;
         dt_utils::datetime_format10 dt10(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt10)) std::cout << "ERROR - datetime_format10 YYYY-MM-DDTHH:MM:SS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format10 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format10 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format10 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format10 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format10 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format10 - second     \n";
      }

      {
         std::string data = "2006-03-04T13:27:54.123";
         dt_utils::datetime dt;
         dt_utils::datetime_format11 dt11(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt11)) std::cout << "ERROR - datetime_format10 YYYY-MM-DDTHH:MM:SS.MSS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format10 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format10 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format10 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format10 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format10 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format10 - second     \n";
         if (dt.millisecond !=  123) std::cout << "ERROR - datetime_format10 - millisecond\n";
      }

      {
         std::string data = "20060304T13:27:54";
         dt_utils::datetime dt;
         dt_utils::datetime_format12 dt12(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt12)) std::cout << "ERROR - datetime_format12 YYYYMMDDTHH:MM:SS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format12 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format12 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format12 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format12 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format12 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format12 - second     \n";
      }

      {
         std::string data = "20060304T13:27:54.123";
         dt_utils::datetime dt;
         dt_utils::datetime_format13 dt13(dt);
         dt.clear();
         if (!strtk::string_to_type_converter(data,dt13)) std::cout << "ERROR - datetime_format13 YYYYMMDDTHH:MM:SS.MSS\n";
         if (dt.year        != 2006) std::cout << "ERROR - datetime_format13 - year       \n";
         if (dt.month       !=    3) std::cout << "ERROR - datetime_format13 - month      \n";
         if (dt.day         !=    4) std::cout << "ERROR - datetime_format13 - day        \n";
         if (dt.hour        !=   13) std::cout << "ERROR - datetime_format13 - hour       \n";
         if (dt.minute      !=   27) std::cout << "ERROR - datetime_format13 - minute     \n";
         if (dt.second      !=   54) std::cout << "ERROR - datetime_format13 - second     \n";
         if (dt.millisecond !=  123) std::cout << "ERROR - datetime_format13 - millisecond\n";
      }
   }
}

strtk_string_to_type_begin(dt_utils::date_format0)
   const int offset_list[] = {4,2,2};
   const strtk::offset_predicate<3> osp(offset_list);
   strtk::std_string::iterator_type token[3];
   if (3 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[1],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format1)
   const int offset_list[] = {4,2,2};
   const strtk::offset_predicate<3> osp(offset_list);
   strtk::std_string::iterator_type token[3];
   if (3 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[1],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format2)
   const int offset_list[] = {4,1,2,1,2};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('/' != (*token[1].first)) || ('/' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.day))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format3)
   const int offset_list[] = {4,1,2,1,2};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('/' != (*token[1].first)) || ('/' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.month))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format4)
   const int offset_list[] = {2,1,2,1,4};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('/' != (*token[1].first)) || ('/' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.year))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format5)
   const int offset_list[] = {2,1,2,1,4};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('/' != (*token[1].first)) || ('/' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.year))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format6)
   const int offset_list[] = {4,1,2,1,2};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('-' != (*token[1].first)) || ('-' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.day))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format7)
   const int offset_list[] = {4,1,2,1,2};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('-' != (*token[1].first)) || ('-' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.month))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format8)
   const int offset_list[] = {2,1,2,1,4};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('-' != (*token[1].first)) || ('-' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.year))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::date_format9)
   const int offset_list[] = {2,1,2,1,4};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('-' != (*token[1].first)) || ('-' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.year))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::time_format0)
   const int offset_list[] = {2,1,2,1,2,1,3};
   const strtk::offset_predicate<7> osp(offset_list);
   strtk::std_string::iterator_type token[7];
   if (7 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if ((':' != (*token[1].first)) || (':' != (*token[3].first)) || ('.' != (*token[5].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::time_format1)
   const int offset_list[] = {2,1,2,1,2};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if ((':' != (*token[1].first)) || (':' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::time_format2)
   const int offset_list[] = {2,1,2,1,2,1,3};
   const strtk::offset_predicate<7> osp(offset_list);
   strtk::std_string::iterator_type token[7];
   if (7 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if ((' ' != (*token[1].first)) || (' ' != (*token[3].first)) || (' ' != (*token[5].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::time_format3)
   const int offset_list[] = {2,1,2,1,2};
   const strtk::offset_predicate<5> osp(offset_list);
   strtk::std_string::iterator_type token[5];
   if (5 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if ((' ' != (*token[1].first)) || (' ' != (*token[3].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format00)
   const int offset_list[] = {4,2,2,1,2,1,2,1,2,1,3};
   const strtk::offset_predicate<11> osp(offset_list);
   strtk::std_string::iterator_type token[11];
   if (11 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (
             (' ' != (*token[3].first)) || (':' != (*token[5].first)) ||
             (':' != (*token[7].first)) || ('.' != (*token[9].first))
           )
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[1],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format01)
   const int offset_list[] = {4,1,2,1,2,1,2,1,2,1,2,1,3};
   const strtk::offset_predicate<13> osp(offset_list);
   strtk::std_string::iterator_type token[13];
   if (13 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (
             ('/' != (*token[1].first)) || ('/' != (*token[3].first)) ||
             (' ' != (*token[5].first)) || (':' != (*token[7].first)) ||
             (':' != (*token[9].first)) || ('.' != (*token[11].first))
           )
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[12],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format02)
   const int offset_list[] = {2,1,2,1,4,1,2,1,2,1,2,1,3};
   const strtk::offset_predicate<13> osp(offset_list);
   strtk::std_string::iterator_type token[13];
   if (13 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (
             ('/' != (*token[1].first)) || ('/' != (*token[3].first)) ||
             (' ' != (*token[5].first)) || (':' != (*token[7].first)) ||
             (':' != (*token[9].first)) || ('.' != (*token[11].first))
           )
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[12],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format03)
   const int offset_list[] = {4,2,2,1,2,1,2,1,2};
   const strtk::offset_predicate<9> osp(offset_list);
   strtk::std_string::iterator_type token[9];
   if (9 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if ((' ' != (*token[3].first)) || (':' != (*token[5].first)) || (':' != (*token[7].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[1],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format04)
   const int offset_list[] = {4,1,2,1,2,1,2,1,2,1,2};
   const strtk::offset_predicate<11> osp(offset_list);
   strtk::std_string::iterator_type token[11];
   if (11 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('/' != (*token[1].first)) || ('/' != (*token[3].first)) ||
            (' ' != (*token[5].first)) || (':' != (*token[7].first)) ||
            (':' != (*token[9].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format05)
   const int offset_list[] = {2,1,2,1,4,1,2,1,2,1,2};
   const strtk::offset_predicate<11> osp(offset_list);
   strtk::std_string::iterator_type token[11];
   if (11 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('/' != (*token[1].first)) || ('/' != (*token[3].first)) ||
            (' ' != (*token[5].first)) || (':' != (*token[7].first)) ||
            (':' != (*token[9].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format06)
   const int offset_list[] = {4,1,2,1,2,1,2,1,2,1,2,1,3};
   const strtk::offset_predicate<13> osp(offset_list);
   strtk::std_string::iterator_type token[13];
   if (13 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (
             ('-' != (*token[1].first)) || ('-' != (*token[3].first)) ||
             (' ' != (*token[5].first)) || (':' != (*token[7].first)) ||
             (':' != (*token[9].first)) || ('.' != (*token[11].first))
           )
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[12],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format07)
   const int offset_list[] = {2,1,2,1,4,1,2,1,2,1,2,1,3};
   const strtk::offset_predicate<13> osp(offset_list);
   strtk::std_string::iterator_type token[13];
   if (13 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (
             ('-' != (*token[1].first)) || ('-' != (*token[3].first)) ||
             (' ' != (*token[5].first)) || (':' != (*token[7].first)) ||
             (':' != (*token[9].first)) || ('.' != (*token[11].first))
           )
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[12],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format08)
   const int offset_list[] = {4,1,2,1,2,1,2,1,2,1,2};
   const strtk::offset_predicate<11> osp(offset_list);
   strtk::std_string::iterator_type token[11];
   if (11 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('-' != (*token[1].first)) || ('-' != (*token[3].first)) ||
            (' ' != (*token[5].first)) || (':' != (*token[7].first)) ||
            (':' != (*token[9].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format09)
   const int offset_list[] = {2,1,2,1,4,1,2,1,2,1,2};
   const strtk::offset_predicate<11> osp(offset_list);
   strtk::std_string::iterator_type token[11];
   if (11 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('-' != (*token[1].first)) || ('-' != (*token[3].first)) ||
            (' ' != (*token[5].first)) || (':' != (*token[7].first)) ||
            (':' != (*token[9].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format10)
   const int offset_list[] = {4,1,2,1,2,1,2,1,2,1,2};
   const strtk::offset_predicate<11> osp(offset_list);
   strtk::std_string::iterator_type token[11];
   if (11 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('-' != (*token[1].first)) || ('-' != (*token[3].first)) ||
            ('T' != (*token[5].first)) || (':' != (*token[7].first)) ||
            (':' != (*token[9].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format11)
   const int offset_list[] = {4,1,2,1,2,1,2,1,2,1,2,1,3};
   const strtk::offset_predicate<13> osp(offset_list);
   strtk::std_string::iterator_type token[13];
   if (13 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('-' != (*token[1].first)) || ('-' != (*token[3].first)) ||
            ('T' != (*token[5].first)) || (':' != (*token[7].first)) ||
            (':' != (*token[9].first)) || ('.' != (*token[11].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[12],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format12)
   const int offset_list[] = {4,2,2,1,2,1,2,1,2};
   const strtk::offset_predicate<9> osp(offset_list);
   strtk::std_string::iterator_type token[9];
   if (9 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('T' != (*token[3].first)) || (':' != (*token[5].first)) ||
            (':' != (*token[7].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[1],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.second))
      return false;
   return true;
strtk_string_to_type_end()

strtk_string_to_type_begin(dt_utils::datetime_format13)
   const int offset_list[] = {4,2,2,1,2,1,2,1,2,1,3};
   const strtk::offset_predicate<11> osp(offset_list);
   strtk::std_string::iterator_type token[11];
   if (11 != strtk::offset_splitter(begin,end,osp,token))
      return false;
   else if (('T' != (*token[3].first)) || (':' != (*token[5].first)) ||
            (':' != (*token[7].first)) || ('.' != (*token[9].first)))
      return false;
   else if (!strtk::string_to_type_converter(token[0],t.dt.year))
      return false;
   else if (!strtk::string_to_type_converter(token[1],t.dt.month))
      return false;
   else if (!strtk::string_to_type_converter(token[2],t.dt.day))
      return false;
   else if (!strtk::string_to_type_converter(token[4],t.dt.hour))
      return false;
   else if (!strtk::string_to_type_converter(token[6],t.dt.minute))
      return false;
   else if (!strtk::string_to_type_converter(token[8],t.dt.second))
      return false;
   else if (!strtk::string_to_type_converter(token[10],t.dt.millisecond))
      return false;
   return true;
strtk_string_to_type_end()

#endif
