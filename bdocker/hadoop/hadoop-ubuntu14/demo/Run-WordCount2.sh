
# create input files 
mkdir input
echo "Hello Docker" >input/file2.txt
echo "Hello Hadoop" >input/file1.txt

# create input directory on HDFS
hadoop fs -mkdir -p input

# put input files to HDFS
hdfs dfs -put ./input/* input

# compile WordCount2.java
hadoop com.sun.tools.javac.Main WordCount2.java

# jar 
jar cf wc.jar WordCount*.class

# run WordCount2
hadoop jar ./wc.jar WordCount2 input output

# print the input files
echo -e "\ninput file1.txt:"
hdfs dfs -cat input/file1.txt

echo -e "\ninput file2.txt:"
hdfs dfs -cat input/file2.txt

# print the output of wordcount
echo -e "\nwordcount output:"
hdfs dfs -cat output/part-r-00000
 
# hadoop fs -cat output/part-r-00000