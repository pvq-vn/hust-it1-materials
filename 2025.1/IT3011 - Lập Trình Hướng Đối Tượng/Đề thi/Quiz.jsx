import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Flag, RotateCcw, ChevronLeft, ChevronRight, BookOpen, LayoutGrid, CheckSquare, Zap, Terminal, BrainCircuit, Coffee } from 'lucide-react';

/**
 * ĐỀ SỐ 3: HARDCORE MIXED
 * Nguồn: Tổng hợp 3 file PDF đề thi + Slide bài giảng IT3100
 * Đặc điểm: Code và Lý thuyết xen kẽ, nhiều câu hỏi về UML, Thread, Memory.
 */
const QUESTIONS = [
    {
        id: 1,
        text: "Phát biểu nào đúng về khởi tạo và hủy bỏ đối tượng trong Java?",
        options: [
        "Trong Java không có phương thức hủy",
        "Java có phương thức có thể dùng thay thế phương thức hủy là phương thức finalize",
        "Một lớp luôn luôn có ít nhất 1 phương thức khởi tạo",
        "Mỗi đối tượng khi tồn tại và hoạt động được hệ điều hành cấp phát một vùng nhớ để lưu lại các liệu thành phần",
        "Các thuộc tính kiểu DL nguyên thủy (int, char, boolean,...) của đối tượng phải được Lập trình viên khởi tạo trước khi sử dụng"
        ],
        correctAnswers: [
        "Trong Java không có phương thức hủy",
        "Java có phương thức có thể dùng thay thế phương thức hủy là phương thức finalize",
        "Một lớp luôn luôn có ít nhất 1 phương thức khởi tạo",
        "Mỗi đối tượng khi tồn tại và hoạt động được hệ điều hành cấp phát một vùng nhớ để lưu lại các liệu thành phần"
        ],
        explanation: "1, 2, 3, 4 đúng. 5 sai vì thuộc tính nguyên thủy sẽ có giá trị mặc định (0, false...) nếu không được khởi tạo.",
        topic: "Object Lifecycle"
    },
    {
        id: 2,
        text: "Nhận định nào sau đây đúng về đoạn code sau?",
        code: `public class Test {
        static int calculate(int no, int nol) throw Exception { //dong 2
            if (nol == 0) throw new Exception(""); //dong 3
            return no / nol; //dong 4
        }
        public static void main(String[] args) {}
    }`,
        options: [
        "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 2",
        "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 3",
        "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 4",
        "Chương trình biên dịch thành công"
        ],
        correctAnswers: ["Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 2"],
        explanation: "Cú pháp đúng phải là 'throws' (có s) khi khai báo ngoại lệ ở phương thức.",
        topic: "Exception Handling"
    },
    {
        id: 3,
        text: "Chọn những phát biểu đúng về Java collection framework:",
        options: [
        "List và ArrayList đều là các class",
        "List kế thừa (extends) Collection",
        "Java collection framework không hỗ trợ kiểu dữ liệu tập hợp",
        "Java collection framework không hỗ trợ kiểu dữ liệu dictionary"
        ],
        correctAnswers: ["List kế thừa (extends) Collection"],
        explanation: "List là interface kế thừa Collection. ArrayList là class. Framework có hỗ trợ Set (tập hợp) và Map (dictionary).",
        topic: "Collections"
    },
    {
        id: 4,
        text: "Đoạn mã sau khi chạy in ra gì?",
        code: `public class MyClass {
        int i = 111;
        static int j = 222;
        static void methodOne(int i, int j) {
            System.out.print(i);
            System.out.print(j);
        }
        public static void main(String[] args) {
            methodOne(333, 444);
        }
    }`,
        options: ["111222", "333222", "333444", "Lỗi biên dịch"],
        correctAnswers: ["333444"],
        explanation: "Phương thức methodOne sử dụng tham số i, j được truyền vào (333, 444) thay vì biến của lớp.",
        topic: "Variable Scope"
    },
    {
        id: 5,
        text: "Lựa chọn nào đúng với những nhận xét sau đây trong Java?\n 1. Nếu lập trình viên không tạo phương thức khởi tạo cho lớp thì Java sẽ tự động tạo phương thức khởi tạo mặc định cho lớp.\n 2. Có thể viết chồng phương thức khởi tạo (constructor overloading).\n 3. Có thể viết đè phương thức khởi tạo (constructor overriding) kế thừa từ lớp cha.",
        options: [
        "Tất cả nhận xét đều đúng",
        "Tất cả nhận xét đều sai",
        "Nhận xét 1 và 2 đúng, nhận xét 3 sai",
        "Nhận xét 1 đúng, nhận xét 2 và 3 sai"
        ],
        correctAnswers: ["Nhận xét 1 và 2 đúng, nhận xét 3 sai"],
        explanation: "Constructor không thể bị ghi đè (override), chỉ có thể nạp chồng (overload).",
        topic: "Constructors"
    },
    {
        id: 6,
        text: "Giả sử phương thức (1) là đúng. Chỉ ra các phương thức là nạp chồng (overload) hợp lệ với phương thức này?",
        code: `class A {
            // (1)
            public int method(int a) { return 1; }
            // (2)
            protected int method(int a) { return 2; }
            // (3)
            public double method(int a) { return 3; }
            // (4)
            public int method(double a) { return (int) 4; }
        }
        class B {
            // (5)
            public int method(int a, int b) { return 5; }
        }`,
        options: ["Phương thức (2)", "Phương thức (3)", "Phương thức (4)", "Phương thức (5)"],
        correctAnswers: ["Phương thức (4)"],
        explanation: "(2) và (3) sai vì trùng tham số (chỉ khác kiểu trả về hoặc access modifier không tính là overload). (4) đúng vì khác kiểu tham số.",
        topic: "Method Overloading"
    },
    {
        id: 7,
        text: "Kết quả thực thi đoạn code sau là gì?",
        code: `public class Test {
        public static int sCounter = 0;
        public int counter = 0;
        public static void main(String[] args) {
            Test t1 = new Test();
            t1.counter = 5;
            t1.sCounter = 6;
            System.out.print(t1.counter + "" + t1.sCounter);
            Test t2 = new Test();
            System.out.print(t2.counter + "" + t2.sCounter);
            t2.sCounter = 7;
            System.out.print(t1.counter + "" + t1.sCounter);
        }
    }`,
        options: ["560657", "565657", "560056", "560057"],
        correctAnswers: ["560657"],
        explanation: "t1.counter=5, sCounter=6 -> in 56. t2 tạo mới, counter=0, sCounter chung=6 -> in 06. t2 đổi sCounter=7 (ảnh hưởng cả t1) -> t1 in 57.",
        topic: "Static Keyword"
    },
    {
        id: 8,
        text: "Chọn những phát biểu đúng về kết tập (Aggregation):",
        options: [
        "Ký hiệu kết tập trong UML, hình thoi đặt ở lớp toàn thể",
        "Đối tượng lớp thành phần được khởi tạo trước đối tượng lớp toàn thể",
        "Kết tập là một loại hợp thành (Composition)",
        "Kết tập là một loại liên kết (Association)"
        ],
        correctAnswers: [
        "Ký hiệu kết tập trong UML, hình thoi đặt ở lớp toàn thể",
        "Kết tập là một loại liên kết (Association)"
        ],
        explanation: "Kết tập là dạng liên kết 'has-a' lòng lẻo. Composition là dạng chặt chẽ hơn của Aggregation.",
        topic: "UML Relationships"
    },
    {
        id: 9,
        text: "Lựa chọn nào là chính xác cho kết quả đoạn chương trình sau?",
        code: `public class B {
        public static void main(String[] args) {
            for (int i=2; i<4; i++)
                for (int j=2; j<4; j++)
                    if (i <= j) break;
                    else System.out.print("i=" + i + " j=" + j);
        }
    }`,
        options: [
        "Lỗi khi biên dịch",
        "Chương trình chạy thông và in ra màn hình i=3 j=2",
        "Chương trình chạy thông và in ra màn hình i=4 j=3",
        "Chương trình chạy nhưng ném Exception"
        ],
        correctAnswers: ["Chương trình chạy thông và in ra màn hình i=3 j=2"],
        explanation: "Khi i=2, j=2 (i<=j) -> break. Khi i=3, j=2 (3<=2 false) -> in i=3 j=2. Khi i=3, j=3 (i<=j) -> break.",
        topic: "Loop Control"
    },
    {
        id: 10,
        text: "Đoạn chương trình sau báo lỗi biên dịch. Thêm câu lệnh nào vào dòng ... để chương trình không còn báo lỗi?",
        code: `class X {
        public X(int i) {}
    }
    class Y extends X {
        public Y(){
            // ...
            System.out.println(2);
        }
    }`,
        options: ["super();", "super(1);", "Không cần thêm lệnh", "System.out.println(1);"],
        correctAnswers: ["super(1);"],
        explanation: "Lớp cha X không có constructor mặc định, nên lớp con Y phải gọi tường minh super(int) ở dòng đầu tiên của constructor.",
        topic: "Inheritance"
    },
    {
        id: 11,
        text: "Chọn những phát biểu đúng về quan hệ Hợp thành (Composition):",
        options: [
        "Hợp thành cũng là một loại kết tập (aggregation)",
        "Kết tập cũng là một loại liên kết (association)",
        "Trong quan hệ hợp thành, đối tượng lớp toàn thể chịu trách nhiệm tạo và hủy bỏ đối tượng lớp thành phần",
        "Trong quan hệ hợp thành, đối tượng lớp thành phần không thể tồn tại độc lập",
        "Trong quan hệ hợp thành, đối tượng lớp thành phần có thể thuộc về nhiều hơn một lớp toàn thể"
        ],
        correctAnswers: [
        "Hợp thành cũng là một loại kết tập (aggregation)",
        "Kết tập cũng là một loại liên kết (association)",
        "Trong quan hệ hợp thành, đối tượng lớp toàn thể chịu trách nhiệm tạo và hủy bỏ đối tượng lớp thành phần",
        "Trong quan hệ hợp thành, đối tượng lớp thành phần không thể tồn tại độc lập"
        ],
        explanation: "Composition là quan hệ sở hữu chặt chẽ (part-of), thành phần không tồn tại nếu thiếu toàn thể và chỉ thuộc về 1 toàn thể.",
        topic: "UML Relationships"
    },
    {
        id: 12,
        text: "Những phát biểu nào sau đây là SAI?",
        options: [
        "Một phương thức final có thể được nạp chồng (overloaded) trong Java",
        "Một phương thức final có thể được ghi đè (overridden) trong Java",
        "Ta có thể khai báo một phương thức là abstract final trong Java",
        "Ta không thể khai báo một phương thức là abstract final trong Java"
        ],
        correctAnswers: [
        "Một phương thức final có thể được ghi đè (overridden) trong Java",
        "Ta có thể khai báo một phương thức là abstract final trong Java"
        ],
        explanation: "Final ngăn cản ghi đè, Abstract yêu cầu ghi đè -> Mâu thuẫn, không thể dùng chung.",
        topic: "Modifiers"
    },
    {
        id: 13,
        text: "Chọn những dòng in ra màn hình kết quả là true:",
        code: `String s1 = new String("test");
        String s2 = new String("test");
        String s3 = "test";
        String s4 = "test";
        System.out.println(s1 == s2); // Dòng 7
        System.out.println(s3 == s4); // Dòng 8
        System.out.println(s1 == s3); // Dòng 9
        System.out.println(s1.equals(s2)); // Dòng 10
        System.out.println(s2.equals(s3)); // Dòng 11`,
        options: ["Dòng 7", "Dòng 8", "Dòng 9", "Dòng 10", "Dòng 11"],
        correctAnswers: ["Dòng 8", "Dòng 10", "Dòng 11"],
        explanation: "s3, s4 cùng tham chiếu String Pool (true). s1, s2 khác tham chiếu heap. equals so sánh nội dung (true).",
        topic: "String Pool"
    },
    {
        id: 14,
        text: "Cho biết kết quả của đoạn code sau:",
        code: `public class Test {
        int _$ = 5;
        int $7 = 7;
        int do; 
        public static void main(String argv[]) {
            Test test = new Test();
            System.out.println(test.$7);
        }
    }`,
        options: ["7", "5", "Lỗi biên dịch - $7 không hợp lệ", "Lỗi biên dịch - do không hợp lệ"],
        correctAnswers: ["Lỗi biên dịch - do không hợp lệ"],
        explanation: "'do' là từ khóa trong Java, không thể dùng đặt tên biến.",
        topic: "Identifiers"
    },
    {
        id: 15,
        text: "Đoạn mã sau khi chạy in ra gì?",
        code: `class Person {
        protected String name;
    }
    class Employee extends Person {
        private int salary;
        public Employee(int salary) { this.salary = salary; }
        public int getSalary() { return salary; }
    }
    public class Test {
        public static void main(String[] args) {
            Person p = new Employee(15);
            System.out.println(p.getSalary());
        }
    }`,
        options: ["15", "0", "Lỗi biên dịch", "Lỗi runtime"],
        correctAnswers: ["Lỗi biên dịch"],
        explanation: "Biến p kiểu Person không có phương thức getSalary(). Cần ép kiểu (downcasting) để gọi.",
        topic: "Polymorphism"
    },
    {
        id: 16,
        text: "Câu lệnh nào sau đây được dùng để cấp phát một mảng array trong Java?",
        options: [
        "int[] array = new allocate[10];",
        "int[] array = new arr[10];",
        "int[] array = new int[10];",
        "int[] array = alloc int[10];"
        ],
        correctAnswers: ["int[] array = new int[10];"],
        explanation: "Cú pháp đúng: new dataType[size].",
        topic: "Arrays"
    },
    {
        id: 17,
        text: "Số byte của các biến int, long, float, double trong Java lần lượt là:",
        options: ["4, 8, 16, 32", "4, 8, 8, 16", "4, 8, 4, 8", "4, 8, 12, 16"],
        correctAnswers: ["4, 8, 4, 8"],
        explanation: "int (4), long (8), float (4), double (8).",
        topic: "Primitive Types"
    },
    {
        id: 18,
        text: "Số lượng tối đa thể hiện (instance) được khởi tạo ra của một lớp trừu tượng trong Java có thể là bao nhiêu?",
        options: ["1", "2", "3", "0"],
        correctAnswers: ["0"],
        explanation: "Không thể khởi tạo đối tượng từ lớp trừu tượng (Abstract class).",
        topic: "Abstract Classes"
    },
    {
        id: 19,
        text: "Đoạn mã sau khi chạy in ra gì?",
        code: `public class Demo {
        public static void main(String[] args) {
            System.out.print("Begin ");
            try {
                int i = 5 / 0;
                System.out.print("Try ");
            } catch (Exception ex) {
                System.out.print("Catch ");
            } finally {
                System.out.print("Finally ");
            }
            System.out.print("End");
        }
    }`,
        options: ["Begin End", "Begin Catch End", "Begin Try Catch End", "Begin Catch Finally End"],
        correctAnswers: ["Begin Catch Finally End"],
        explanation: "Gặp lỗi chia 0 -> nhảy vào catch -> thực hiện finally -> thực hiện tiếp code sau khối try-catch.",
        topic: "Exception Handling"
    },
    {
        id: 20,
        text: "Nhận định nào sau đây là đúng với chương trình này?",
        code: `class Hello {
        static int add(int i, int j) { return i + j; }
    }
    public class HelloWorld extends Hello {
        public static void main(String[] argv) {
            short sNum = 10;
            System.out.println(add(sNum, 6));
        }
    }`,
        options: [
        "Chương trình chạy và in 16 ra màn hình",
        "Lỗi khi biên dịch",
        "Lỗi khi chạy chương trình",
        "Chương trình chạy và in 6 ra màn hình"
        ],
        correctAnswers: ["Chương trình chạy và in 16 ra màn hình"],
        explanation: "Short được tự động ép kiểu lên int (widening primitive conversion).",
        topic: "Type Casting"
    },
    {
        id: 21,
        text: "Cho chương trình sau. Nhận định nào đúng về câu lệnh gán 'a = b'?",
        code: `class A {}
    class B extends A {}
    public class Test {
        public static void main(String[] args){
            A a = new A();
            B b = new B();
            a = b; // Câu lệnh gán
        }
    }`,
        options: [
        "Là chuyển đổi kiểu dữ liệu tham chiếu upcasting",
        "Là chuyển đổi kiểu dữ liệu tham chiếu downcasting",
        "Là peertopeercasting",
        "Lỗi biên dịch"
        ],
        correctAnswers: ["Là chuyển đổi kiểu dữ liệu tham chiếu upcasting"],
        explanation: "Gán đối tượng con cho biến tham chiếu cha là Upcasting (luôn an toàn).",
        topic: "Casting"
    },
    {
        id: 22,
        text: "Đoạn mã sau khi chạy in ra gì?",
        code: `class A {
        static void methodOne() { System.out.print("AAA"); }
    }
    class B extends A {
        static void methodOne() { System.out.print("BBB"); }
    }
    public class Test {
        public static void main(String[] args) {
            A a = new B();
            a.methodOne();
        }
    }`,
        options: ["AAA", "BBB", "AAABBB", "BBBAAA"],
        correctAnswers: ["AAA"],
        explanation: "Phương thức static không bị ghi đè (override) mà bị ẩn (hide). Gọi qua tham chiếu lớp nào (A) thì chạy method lớp đó.",
        topic: "Static Methods"
    },
    {
        id: 23,
        text: "Đoạn mã sau có lỗi. Chọn cách sửa đúng?",
        code: `interface X { public void methodX(); }
    interface Y extends X { public void methodY(); }
    class Z implements Y {
        public void methodY() { System.out.println("Method Y"); }
    }`,
        options: [
        "Lớp Z phải triển khai phương thức methodX() của lớp X",
        "Lớp Z phải sửa phạm vi truy cập methodY thành mặc định",
        "Không có cách nào",
        "Lớp Z phải khai báo abstract"
        ],
        correctAnswers: [
        "Lớp Z phải triển khai phương thức methodX() của lớp X",
        "Lớp Z phải khai báo abstract"
        ],
        explanation: "Class implement interface phải định nghĩa TẤT CẢ method (cả của interface cha), hoặc class đó phải là abstract.",
        topic: "Interfaces"
    },
    {
        id: 24,
        text: "Cho biết kết quả của đoạn code sau:",
        code: `public class A {
        int k;
        boolean isTrue;
        static int p;
        public void printValue() {
            System.out.print(k);
            System.out.print(isTrue);
            System.out.print(p);
        }
    }
    // main gọi a.printValue();`,
        options: ["0false0", "0true0", "Lỗi biên dịch", "nullfalse0"],
        correctAnswers: ["0false0"],
        explanation: "Giá trị mặc định: int=0, boolean=false, static int=0.",
        topic: "Default Values"
    },
    {
        id: 25,
        text: "Trong UML, tên lớp trừu tượng sẽ:",
        options: ["Được in nghiêng", "Được in đậm", "Được gạch chân", "Được viết bình thường"],
        correctAnswers: ["Được in nghiêng"],
        explanation: "Quy ước UML.",
        topic: "UML"
    },
    {
        id: 26,
        text: "Kết quả của đoạn code sau là gì?",
        code: `public class A {
        int i = 10;
        public void printValue() { System.out.print("Value-A"); }
    }
    public class B extends A {
        int i = 12;
        public void printValue() { System.out.print("Value-B"); }
    }
    // main: A a = new B(); a.printValue(); System.out.println(a.i);`,
        options: ["Value-B 10", "Value-B 12", "Value-A 10", "Value-A 12"],
        correctAnswers: ["Value-B 10"],
        explanation: "Method được override (đa hình -> Value-B). Biến (Attribute) KHÔNG đa hình, phụ thuộc kiểu tham chiếu (A -> 10).",
        topic: "Polymorphism"
    },
    {
        id: 27,
        text: "Lựa chọn nào là chính xác cho đoạn chương trình sau (cùng package)?",
        code: `class A {
        int a = 5;
        protected int b = 6;
        public int c = 7;
    }
    public class B {
        public static void main(String[] args) {
            A obj = new A();
            System.out.print(obj.a + obj.b + obj.c);
        }
    }`,
        options: [
        "Chương trình chạy thành công và in ra màn hình 567",
        "Lỗi biên dịch ở dòng truy cập obj.a",
        "Lỗi biên dịch ở dòng truy cập obj.b",
        "Exception khi chạy"
        ],
        correctAnswers: ["Chương trình chạy thành công và in ra màn hình 567"],
        explanation: "Cùng package nên truy cập được default (a), protected (b) và public (c).",
        topic: "Access Modifiers"
    },
    {
        id: 28,
        text: "Vai trò của biểu đồ use case:",
        options: [
        "Mô hình chức năng hệ thống với các tác nhân",
        "Biểu diễn chuỗi các hoạt động",
        "Biểu diễn các lớp và mối quan hệ",
        "Biểu diễn trình tự trao đổi thông điệp"
        ],
        correctAnswers: ["Mô hình chức năng hệ thống với các tác nhân"],
        explanation: "Use case diagram thể hiện Actor và Use Case.",
        topic: "UML"
    },
    {
        id: 29,
        text: "Chọn phát biểu đúng về 2 lớp sau:",
        code: `final class Person {
            protected String name;
            protected String print() {
                return name;
            }
        }

        class Employee extends Person {
            protected String print() {
                System.out.println(super.print());
                return super.print();
            }
        }`,
        options: [
        "Có lỗi biên dịch ở lớp Employee",
        "Có lỗi biên dịch ở lớp Person",
        "Không có lỗi"
        ],
        correctAnswers: ["Có lỗi biên dịch ở lớp Employee"],
        explanation: "Lớp final không thể bị kế thừa.",
        topic: "Final Keyword"
    },
    {
        id: 30,
        text: "Đoạn mã sau khi chạy in ra gì?",
        code: `class A { int i = 200; }
    class B extends A { int i = 100; }
    public class Test {
        public static void main(String[] args) {
            B a = new B();
            System.out.println(a.i);
        }
    }`,
        options: ["100", "200", "Lỗi biên dịch"],
        correctAnswers: ["100"],
        explanation: "Biến tham chiếu kiểu B, nên truy cập biến i của B (Variable Shadowing).",
        topic: "Variable Shadowing"
    },
    {
        id: 31,
        text: "Lớp Employee ở package khác có lỗi ở dòng nào khi truy cập biến của Person?",
        code: `// Person (package 1): private int a1; int a2; protected int a3; public int a4;
    // Employee extends Person (package 2):
    // truy cập a1, a2, a3, a4`,
        options: ["Truy cập a1, a2 lỗi", "Không lỗi", "Truy cập a3 lỗi"],
        correctAnswers: ["Truy cập a1, a2 lỗi"],
        explanation: "Khác package: chỉ truy cập được public (a4) và protected (a3 - do kế thừa). Private (a1) và Default (a2) không được.",
        topic: "Access Modifiers"
    },
    {
        id: 32,
        text: "Đâu là các đặc tính của lập trình hướng đối tượng?",
        options: [
        "Tất cả đều là đối tượng",
        "Chương trình là tập hợp các đối tượng tương tác",
        "Mỗi đối tượng có dữ liệu và bộ nhớ riêng",
        "Tất cả các đáp án trên"
        ],
        correctAnswers: ["Tất cả các đáp án trên"],
        explanation: "Các đặc tính cơ bản của OOP.",
        topic: "OOP Concepts"
    },
    {
        id: 33,
        text: "Phương thức khởi tạo (Constructor) có thể dùng kết hợp với từ khóa nào?",
        options: [
        "Có thể dùng với cả abstract và static",
        "Có thể dùng với abstract",
        "Có thể dùng với static",
        "Không thể dùng với cả abstract và static"
        ],
        correctAnswers: ["Không thể dùng với cả abstract và static"],
        explanation: "Constructor luôn có thân hàm (không abstract) và gắn với instance (không static).",
        topic: "Constructors"
    },
    {
        id: 34,
        text: "Kết quả thực thi chương trình sau là gì (với hàm overloading)?",
        code: `public class Test {
        public static void p(String s) {
            System.out.print(s + " ");
        }
        public static void f(int i) {
            p("int");
        }
        public static void f(short h) {
            p("short");
        }
        public static void f(char c) {
            p("char");
        }
        public static void f(long l) {
            p("long");
        }
        public static void f(double d) {
            p("double");
        }
        public static void f(float f) {
            p("float");
        }
        public static void main(String[] args) {
            f(5);
            f('c');
            f(5.5);
            f(7L);
        }
    }`,
        options: ["int char double long", "int int float long", "Lỗi biên dịch"],
        correctAnswers: ["int char double long"],
        explanation: "Cơ chế chọn hàm overload dựa trên kiểu tham số truyền vào khớp nhất.",
        topic: "Overloading"
    },
    {
        id: 35,
        text: "Kết quả của đoạn code sau:",
        code: `System.out.println(032);
    System.out.println(0x2a);`,
        options: ["26 42", "32 42", "26 2a", "Lỗi biên dịch"],
        correctAnswers: ["26 42"],
        explanation: "032 là hệ bát phân (octal 32 = 26). 0x2a là hệ thập lục phân (hex 2a = 42).",
        topic: "Number Systems"
    },
    {
        id: 36,
        text: "Chương trình sau sẽ cho kết quả là gì?",
        code: `public class Test {
        public static void main(String args[]) {
            if (args.length > 0) System.out.println(args.length);
        }
    }
    // Chạy lệnh: java Test`,
        options: [
        "Chương trình chạy thành công nhưng không in gì",
        "In 0",
        "In 1",
        "Lỗi biên dịch"
        ],
        correctAnswers: ["Chương trình chạy thành công nhưng không in gì"],
        explanation: "Khi chạy không truyền tham số, args.length = 0, điều kiện if sai.",
        topic: "Command Line Args"
    },
    {
        id: 37,
        text: "Chọn những phát biểu đúng về lỗi biên dịch khi ghi đè (Override) trong lớp Employee:",
        code: `class Person {
            protected String name;
            private String print1() {
                return name;
            }
            protected String print2() {
                return name.toUpperCase();
            }
            protected String print3() {
                return name.toLowerCase();
            }
        }
        class Employee extends Person {
            private void print1() {
                System.out.println(name);
            }
            protected void print2() {
                System.out.println("Name: " + name.toUpperCase());
            }
            String print3() {
                return "Name: " + name.toLowerCase();
            }
        }`,
        options: ["Lỗi biên dịch ở phương thức print2", "Lỗi biên dịch ở phương thức print3", "Lỗi biên dịch ở phương thức print1", "Không bị lỗi gì cả"],
        correctAnswers: ["Lỗi biên dịch ở phương thức print3", "Lỗi biên dịch ở phương thức print2"],
        explanation: "Ghi đè không được làm hẹp phạm vi truy cập (protected -> private là sai).",
        topic: "Overriding"
    },
    {
        id: 38,
        text: "Đoạn mã sau bị lỗi biên dịch ở những dòng nào?",
        code: `static short check(long l) { return (short) l; } // giả sử cast đúng
    // main:
    double d = 10.25;
    float f = d; // Lỗi 1
    byte b = (byte) check(f); // Lỗi 2`,
        options: ["Lỗi gán double sang float", "Lỗi truyền float vào long", "Cả 2 lỗi trên"],
        correctAnswers: ["Cả 2 lỗi trên"],
        explanation: "double -> float cần ép kiểu tường minh. float -> long cũng cần ép kiểu (mất phần thập phân).",
        topic: "Type Casting"
    },
    {
        id: 39,
        text: "Đoạn mã sau khi chạy in ra gì?",
        code: `class A extends B { A() { System.out.print("Class A."); } }
    class B { B() { System.out.print("Class B."); } }
    // main: A a = new A(); B c = new B(); A b = new A();`,
        options: ["Class B.Class A.Class B.Class B.Class A.", "Class A.Class B...", "Lỗi"],
        correctAnswers: ["Class B.Class A.Class B.Class B.Class A."],
        explanation: "new A() -> gọi B() trước -> in B.A. new B() -> in B. new A() -> in B.A.",
        topic: "Constructor Chaining"
    },
    {
        id: 40,
        text: "Đoạn mã sau khi chạy in ra gì (shadowing với this)?",
        code: `class A { int i = 50; }
    class N extends A {
        public N(int j) {
            super(); // i=50
            this.i = 250; // sửa i của N (kế thừa)
            this.i = 500;
        }
    }
    // main: N n = new N(25); System.out.print(n.i);`,
        options: ["500", "250", "50", "Lỗi"],
        correctAnswers: ["500"],
        explanation: "Biến i được kế thừa và cập nhật giá trị cuối cùng là 500.",
        topic: "Variable Shadowing"
    },
    {
        id: 41,
        text: "Nhận định nào sau đây đúng về đoạn chương trình sau?",
        code: `interface A {
        void f(); // dòng 2
    }
    interface B extends A {
        void f(); // dòng 6
    }
    abstract class C implements A {
        abstract void f(); // dòng 10
    }`,
        options: [
        "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 2",
        "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 6",
        "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 10",
        "Chương trình biên dịch thành công"
        ],
        correctAnswers: ["Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 10"],
        explanation: "Phương thức trong interface mặc định là public. Khi lớp C khai báo lại 'abstract void f()' mà không có từ khóa public (mặc định là package-private), nó làm hẹp phạm vi truy cập -> Lỗi biên dịch.",
        topic: "Interface & Abstract Class"
    },
    {
        id: 42,
        text: "Lớp Person sau bị lỗi ở những dòng nào?",
        code: `interface Printable { public void print(); }
    interface Stringable { String stringify(); }

    class Person implements Printable, Stringable {
        protected String name;
        public String stringify() { return name; }
        public void print() { System.out.println(name); }

        public static void main(String[] args) {
            Printable p1 = new Printable(); // Dòng 10
            Printable p2 = new Person();
            String name = p2.stringify();   // Dòng 12
        }
    }`,
        options: ["Dòng 10", "Dòng 12", "Cả dòng 10 và 12"],
        correctAnswers: ["Cả dòng 10 và 12"],
        explanation: "Dòng 10 lỗi vì không thể khởi tạo interface (new Printable()). Dòng 12 lỗi vì biến p2 kiểu Printable không có phương thức stringify() (dù đối tượng Person có).",
        topic: "Interfaces"
    },
    {
        id: 43,
        text: "Câu lệnh nào sau đây hợp lệ trong Java để khai báo mảng 2 chiều?",
        options: [
        "int arr[][] = new int[5][5];",
        "int[] arr[] = new int[5][5];",
        "int[][] arr = new int[5][5];",
        "Tất cả đều đúng"
        ],
        correctAnswers: ["Tất cả đều đúng"],
        explanation: "Java cho phép đặt dấu ngoặc vuông [] sau kiểu dữ liệu hoặc sau tên biến đều được.",
        topic: "Arrays"
    },
    {
        id: 44,
        text: "Đoạn mã sau khi chạy in ra gì?",
        code: `public class Demo {
        static int methodReturningValue() {
            try {
                int i = Integer.parseInt("abc"); // Gây lỗi NumberFormatException
                return 20;
            } finally {
                return 50;
            }
        }
        public static void main(String[] s) {
            System.out.println(methodReturningValue());
        }
    }`,
        options: ["20", "50", "Lỗi Runtime", "Lỗi biên dịch"],
        correctAnswers: ["50"],
        explanation: "Khối finally luôn được thực thi. Nếu trong finally có lệnh return, nó sẽ ghi đè mọi return hoặc exception trước đó.",
        topic: "Exception Handling"
    },
    {
        id: 45,
        text: "Ta có thể gọi phương thức super() và this() từ đâu?",
        options: [
        "Có thể gọi từ phương thức thông thường",
        "Chỉ có thể gọi từ phương thức khởi tạo (constructor)",
        "Có thể gọi từ cả hai",
        "Không thể gọi từ đâu cả"
        ],
        correctAnswers: ["Chỉ có thể gọi từ phương thức khởi tạo (constructor)"],
        explanation: "super() và this() dùng để gọi constructor của lớp cha hoặc cùng lớp, và phải là câu lệnh đầu tiên trong constructor.",
        topic: "Constructors"
    },
    {
        id: 46,
        text: "Chọn phát biểu đúng về đoạn code sau:",
        code: `public void print1(ArrayList<Object> list) { ... }
    public void print2(ArrayList<?> list) { ... }
    public void print3(ArrayList<T> list) { ... }

    // main:
    ArrayList<Employee> list = new ArrayList<>();
    print1(list); // Gọi 1
    print2(list); // Gọi 2
    print3(list); // Gọi 3`,
        options: [
        "Lời gọi hàm print1 bị lỗi biên dịch",
        "Lời gọi hàm print2 bị lỗi biên dịch",
        "Lời gọi hàm print3 bị lỗi biên dịch",
        "Không lời gọi nào bị lỗi"
        ],
        correctAnswers: ["Lời gọi hàm print1 bị lỗi biên dịch"],
        explanation: "ArrayList<Employee> KHÔNG phải là con của ArrayList<Object>. Generic trong Java là bất biến (invariant).",
        topic: "Generics"
    },
    {
        id: 47,
        text: "Cho lớp P và lớp S1, S2. Lớp nào bị lỗi biên dịch?",
        code: `class P {
        public P(String name) {} // Không có constructor mặc định
    }
    class S1 extends P {
        // Không khai báo constructor
    }
    class S2 extends P {
        public S2() {} // Constructor mặc định
    }`,
        options: ["S1", "S2", "Cả S1 và S2", "Không lớp nào lỗi"],
        correctAnswers: ["Cả S1 và S2"],
        explanation: "P không có constructor mặc định (no-arg). S1 lỗi vì constructor mặc định tự sinh sẽ gọi super() không tồn tại. S2 lỗi vì constructor S2() cũng gọi ngầm super().",
        topic: "Inheritance & Constructors"
    },
    {
        id: 48,
        text: "Đoạn mã sau bị lỗi biên dịch ở dòng nào trong lớp A?",
        code: `class A {
        public int check(double a) { return (int) a; } // Dòng 2
        public double check(double a) { return a; }    // Dòng 5
    }`,
        options: ["Dòng 2", "Dòng 5", "Cả 2", "Không lỗi"],
        correctAnswers: ["Dòng 5"],
        explanation: "Nạp chồng (Overloading) không thể chỉ khác nhau ở kiểu trả về. Hai phương thức cùng tên và tham số (double) gây xung đột.",
        topic: "Method Overloading"
    },
    {
        id: 49,
        text: "Kết quả khi thực thi đoạn code sau là gì?",
        code: `public class Person {
        private int age;
        private String name;
        public static void main(String[] args) {
            Person p = new Person();
            System.out.println(p.age);
            System.out.println(p.name);
        }
    }`,
        options: ["Lỗi biên dịch", "0 và null", "null và null", "Rác và null"],
        correctAnswers: ["0 và null"],
        explanation: "Biến instance (thuộc tính) được tự động khởi tạo giá trị mặc định: int là 0, String là null.",
        topic: "Default Values"
    },
    {
        id: 50,
        text: "Trong Java, chuyện gì xảy ra khi một thành phần không tĩnh (non-static) được sử dụng bên trong một phương thức tĩnh (static)?",
        options: [
        "Chương trình biên dịch và chạy thành công",
        "Lỗi Runtime: Non Static Exception",
        "Lỗi Runtime: NullPointerException",
        "Chương trình bị lỗi biên dịch"
        ],
        correctAnswers: ["Chương trình bị lỗi biên dịch"],
        explanation: "Static method thuộc về lớp, không thể truy cập trực tiếp thành phần non-static (thuộc về đối tượng) khi chưa có đối tượng cụ thể.",
        topic: "Static Keyword"
    },
    {
        id: 51,
        text: "Kết quả khi thực thi đoạn code sau?",
        code: `class Person {}
    class Employee extends Person {
        public int getSalary() { return 100; }
    }
    public class Test {
        public static void main(String[] args) {
            Person p = new Employee();
            System.out.println(p.getSalary()); // Dòng 14
        }
    }`,
        options: ["100", "Lỗi biên dịch tại dòng 14", "Lỗi Runtime", "0"],
        correctAnswers: ["Lỗi biên dịch tại dòng 14"],
        explanation: "Biến p kiểu Person không có phương thức getSalary(). Cần ép kiểu về Employee mới gọi được.",
        topic: "Polymorphism"
    },
    {
        id: 52,
        text: "Đâu là các ấn bản Java phát hành bởi Oracle?",
        options: ["Java EE", "Java SE", "Java ME", "Java FX", "Tất cả các đáp án trên"],
        correctAnswers: ["Tất cả các đáp án trên"],
        explanation: "SE (Standard), EE (Enterprise), ME (Micro), FX (Rich Client) đều là các ấn bản/công nghệ của Java.",
        topic: "Java Ecosystem"
    },
    {
        id: 53,
        text: "Kết quả của đoạn mã sau?",
        code: `class A {
        int add(int i, int j) { return i+j; }
    }
    public class Test extends A {
        public static void main(String[] args) {
            short s = 9;
            System.out.println(add(s, 6));
        }
    }`,
        options: ["15", "Lỗi biên dịch"],
        correctAnswers: ["Lỗi biên dịch"],
        explanation: "Phương thức add() là instance method (không static), không thể gọi trực tiếp từ main (static context). Cần tạo đối tượng hoặc đổi add thành static.",
        topic: "Static vs Instance"
    },
    {
        id: 54,
        text: "Cho 3 lớp Person (abstract), Employee (abstract extends Person), Doctor (extends Employee). Lớp nào bị lỗi biên dịch?",
        code: `abstract class Person { abstract void printName(); }
    abstract class Employee extends Person { abstract void printId(); }
    class Doctor extends Employee {
        public void printId() { ... }
        // Thiếu printName()
    }`,
        options: ["Person", "Employee", "Doctor", "Không lỗi"],
        correctAnswers: ["Doctor"],
        explanation: "Lớp Doctor là lớp cụ thể (concrete) nên phải triển khai TẤT CẢ các phương thức abstract từ các lớp cha (bao gồm printName từ Person).",
        topic: "Abstract Classes"
    },
    {
        id: 55,
        text: "Chọn những từ khóa dùng trong xử lý ngoại lệ trong Java?",
        options: ["try, catch, finally, throw, throws", "try, catch, error", "select, try, exception"],
        correctAnswers: ["try, catch, finally, throw, throws"],
        explanation: "Đây là 5 từ khóa chính. 'Exception' và 'Error' là tên lớp, không phải từ khóa.",
        topic: "Exception Handling"
    },
    {
        id: 56,
        text: "Trong Lập Trình Hướng Đối Tượng, một đối tượng tương tác với đối tượng khác được gọi là gì?",
        options: ["Message Reading", "Message Passing", "Data Binding", "Data Reading"],
        correctAnswers: ["Message Passing"],
        explanation: "Truyền thông điệp (gọi phương thức) là cách các đối tượng tương tác.",
        topic: "OOP Concepts"
    },
    {
        id: 57,
        text: "Đâu KHÔNG phải là lớp con kế thừa từ lớp JavaFX javafx.scene.Node?",
        options: ["javafx.scene.Parent", "javafx.scene.Canvas", "javafx.scene.ImageView", "javafx.scene.Point"],
        correctAnswers: ["javafx.scene.Point"],
        explanation: "Point thường là lớp tiện ích hình học, không phải là một Node trong Scene Graph của JavaFX.",
        topic: "JavaFX"
    },
    {
        id: 58,
        text: "Kết quả in ra màn hình là gì?",
        code: `System.out.print("Begin ");
    try {
        int i = 5/0; // Lỗi ArithmeticException
    } catch (Exception ex) {
        System.out.print("Catch ");
        int i = 5/0; // Lỗi tiếp trong catch
    } finally {
        System.out.print("Finally ");
    }
    System.out.print("End ");`,
        options: ["Begin Catch Finally End", "Begin Catch Finally + Exception", "Begin Try Catch Finally"],
        correctAnswers: ["Begin Catch Finally + Exception"],
        explanation: "Lỗi trong try -> vào catch -> in 'Catch'. Lỗi trong catch -> vẫn chạy finally -> in 'Finally'. Sau đó chương trình chết (crash) do lỗi chưa được xử lý, không in 'End'.",
        topic: "Exception Flow"
    },
    {
        id: 59,
        text: "Chọn phát biểu ĐÚNG về ghi đè (overriding):",
        options: [
        "Phương thức lớp con KHÔNG bắt buộc cùng kiểu trả về",
        "Chỉ định truy cập ở lớp con KHÔNG giới hạn chặt hơn lớp cha",
        "Phương thức lớp con có thể tung ra ngoại lệ rộng hơn lớp cha"
        ],
        correctAnswers: ["Chỉ định truy cập ở lớp con KHÔNG giới hạn chặt hơn lớp cha"],
        explanation: "Nếu cha là protected, con phải là protected hoặc public. Không được là private.",
        topic: "Overriding Rules"
    },
    {
        id: 61,
        text: "Đoạn mã sau khi chạy in ra gì? (Lưu ý về truyền tham số)",
        code: `public class Test {
        static void mini(int i, float f, char c, boolean b) {
            i = 100; f = 2.0f; c = 'z'; b = true;
        }
        public static void main(String[] args) {
            int ii = 1; float ff = 1.0f; char cc = 'a'; boolean bb = false;
            mini(ii, ff, cc, bb);
            System.out.println("ii=" + ii + " ff=" + ff + " cc=" + cc + " bb=" + bb);
        }
    }`,
        options: [
        "ii=100 ff=2.0 cc=z bb=true",
        "ii=1 ff=1.0 cc=a bb=false",
        "Lỗi biên dịch"
        ],
        correctAnswers: ["ii=1 ff=1.0 cc=a bb=false"],
        explanation: "Java truyền tham trị (pass-by-value). Với kiểu nguyên thủy, giá trị được copy vào hàm, thay đổi trong hàm không ảnh hưởng biến gốc.",
        topic: "Pass-by-value"
    },
    {
        id: 62,
        text: "Đoạn mã sau bị lỗi ở dòng nào?",
        code: `public class Student {
        public Student(int age) { ... }
        public void main(...) {
            Student s = new Student(); // Dòng 12
        }
    }`,
        options: ["Dòng 12", "Không dòng nào"],
        correctAnswers: ["Dòng 12"],
        explanation: "Lớp đã có constructor tham số (int age) thì Java KHÔNG tạo constructor mặc định nữa. Gọi new Student() sẽ lỗi.",
        topic: "Constructors"
    },
    {
        id: 63,
        text: "Màn hình sẽ in ra gì?",
        code: `int a = 3;
    a = a + 2;
    System.out.println(a);`,
        options: ["3", "5", "Lỗi"],
        correctAnswers: ["5"],
        explanation: "Phép toán cộng bình thường.",
        topic: "Basic Syntax"
    },
    {
        id: 64,
        text: "Ngôn ngữ lập trình nào là hướng đối tượng?",
        options: ["Java", "C", "Pascal"],
        correctAnswers: ["Java"],
        explanation: "C và Pascal là ngôn ngữ thủ tục (Procedural).",
        topic: "General Knowledge"
    },
    {
        id: 65,
        text: "Khẩu hiệu WORE của Java có nghĩa là gì?",
        options: ["Write Once, Run Everywhere", "War on Religious Extremists", "Who Orders Real Estate"],
        correctAnswers: ["Write Once, Run Everywhere"],
        explanation: "Viết một lần, chạy mọi nơi (nhờ JVM).",
        topic: "Java Philosophy"
    },
    {
        id: 66,
        text: "Ai được coi là cha đẻ của Java?",
        options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling"],
        correctAnswers: ["James Gosling"],
        explanation: "Dennis Ritchie (C), Bjarne Stroustrup (C++).",
        topic: "History"
    },
    {
        id: 67,
        text: "Màn hình sẽ in ra gì?",
        code: `int a = 3;
    a = a - 2;
    System.out.println(a);`,
        options: ["1", "3", "Lỗi"],
        correctAnswers: ["1"],
        explanation: "Phép toán trừ bình thường.",
        topic: "Basic Syntax"
    },
    {
        id: 68,
        text: "Các tính chất quan trọng của Hướng đối tượng là gì?",
        options: [
        "Trừu tượng hóa, Đóng gói, Kế thừa, Đa hình",
        "Chỉ Đóng gói và Kế thừa",
        "Không có tính chất nào nêu trên"
        ],
        correctAnswers: ["Trừu tượng hóa, Đóng gói, Kế thừa, Đa hình"],
        explanation: "4 trụ cột của OOP (Abstraction, Encapsulation, Inheritance, Polymorphism).",
        topic: "OOP Concepts"
    },
    {
        id: 69,
        text: "Chương trình sau sẽ thế nào?",
        code: `public class A {
        public static void main(String args[]) {
            abcdefghijk; // Dòng 3
        }
    }`,
        options: ["Biên dịch không thành công do lỗi ở dòng 3", "Chạy thành công", "Lỗi Runtime"],
        correctAnswers: ["Biên dịch không thành công do lỗi ở dòng 3"],
        explanation: "Lệnh vô nghĩa, sai cú pháp.",
        topic: "Syntax Error"
    },
    {
        id: 70,
        text: "Lựa chọn nào đúng về các nhận xét sau?",
        options: [
        "1. C là ngôn ngữ hướng đối tượng (Sai)",
        "2. Java không phải hướng đối tượng (Sai)",
        "3. C ra đời sớm hơn Java (Đúng)"
        ],
        correctAnswers: ["Nhận xét 3 đúng"],
        explanation: "C (1972) ra đời trước Java (1995). C là thủ tục, Java là hướng đối tượng.",
        topic: "History"
    },
    {
    id: 71,
    text: "Kết quả in ra màn hình khi thực thi đoạn code sau là gì?",
    code: `System.out.print("Begin ");
try {
    int i = 5 / 0;
    System.out.print("Try ");
} catch (Exception ex) {
    System.out.print("Catch ");
} finally {
    System.out.print("Finally ");
}
System.out.print("End ");`,
    options: ["Begin End", "Begin Try Catch Finally End", "Begin Catch Finally End", "Begin Catch End"],
    correctAnswers: ["Begin Catch Finally End"],
    explanation: "Lỗi chia 0 xảy ra -> nhảy vào catch (in Catch) -> chạy finally (in Finally) -> chạy tiếp code sau khối try-catch (in End).",
    topic: "Exception Handling"
  },
  {
    id: 72,
    text: "Đoạn mã sau nằm trong hàm main. Nó in ra gì?",
    code: `int x = 7;
int mssv = 10;
final int z = x + mssv;
z++;
System.out.println("Value of z: " + z);`,
    options: ["Báo lỗi", "Value of z: 16", "Value of z: 17"],
    correctAnswers: ["Báo lỗi"],
    explanation: "Biến final (z) không thể bị thay đổi giá trị sau khi đã khởi tạo (lỗi ở dòng z++).",
    topic: "Final Keyword"
  },
  {
    id: 73,
    text: "Những ngôn ngữ lập trình nào hỗ trợ đa thừa kế?",
    options: ["Java", "C#", "C++", "Không phải ngôn ngữ nào trong 3 ngôn ngữ trên"],
    correctAnswers: ["C++"],
    explanation: "C++ hỗ trợ đa kế thừa lớp. Java và C# chỉ hỗ trợ đơn kế thừa lớp (nhưng đa thực thi interface).",
    topic: "Programming Languages"
  },
  {
    id: 74,
    text: "Chọn những phát biểu đúng về xử lý ngoại lệ trong Java:",
    options: [
      "Xử lý ngoại lệ giúp chương trình đáng tin cậy hơn, tránh kết thúc bất thường",
      "Mô hình xử lý ngoại lệ với try catch giúp tách biệt khối lệnh có thể xảy ra ngoại lệ và khối lệnh xử lý ngoại lệ",
      "Khi xảy ra ngoại lệ, đối tượng ngoại lệ được tạo ra và truyền đến khối catch",
      "Khi xảy ra ngoại lệ, ngoại lệ bắt buộc phải được xử lý ngay ở phương thức xảy ra ngoại lệ"
    ],
    correctAnswers: [
      "Xử lý ngoại lệ giúp chương trình đáng tin cậy hơn, tránh kết thúc bất thường",
      "Mô hình xử lý ngoại lệ với try catch giúp tách biệt khối lệnh có thể xảy ra ngoại lệ và khối lệnh xử lý ngoại lệ",
      "Khi xảy ra ngoại lệ, đối tượng ngoại lệ được tạo ra và truyền đến khối catch"
    ],
    explanation: "Ngoại lệ có thể được ném (throw) ra phương thức cha để xử lý, không bắt buộc xử lý ngay tại chỗ.",
    topic: "Exception Handling"
  },
  {
    id: 75,
    text: "Phương thức test bị lỗi biên dịch ở những dòng gọi hàm nào?",
    code: `public void check1(int n) throws Exception { ... } // Checked Exception
public void check2(int n) throws RuntimeException { ... } // Unchecked
public void check3(int n) throws Exception, RuntimeException { ... }

public void test() {
    int n = 4;
    check1(n); // Gọi 1
    check2(n); // Gọi 2
    check3(n); // Gọi 3
}`,
    options: ["Lời gọi phương thức check1", "Lời gọi phương thức check2", "Lời gọi phương thức check3", "Không bị lỗi gì"],
    correctAnswers: ["Lời gọi phương thức check1", "Lời gọi phương thức check3"],
    explanation: "check1 và check3 ném Checked Exception (Exception) nên bắt buộc phải try-catch hoặc khai báo throws trong method test. check2 ném Unchecked Exception (RuntimeException) nên không bắt buộc.",
    topic: "Checked vs Unchecked Exceptions"
  },
  {
    id: 76,
    text: "Kết quả khi thực thi chương trình sau là gì?",
    code: `public class Test {
    public static void increase1(int[] arr) {
        for (int a : arr) a += 1;
    }
    public static void increase2(int[] arr) {
        for (int i = 0; i < arr.length; ++i) arr[i]++;
    }
    public static void main(String[] args) {
        int arr[] = {5, 6, 7};
        increase1(arr);
        increase2(arr);
        for (int a : arr) System.out.print(a);
    }
}`,
    options: ["567", "678", "789", "456"],
    correctAnswers: ["678"],
    explanation: "increase1 dùng for-each (tham trị của phần tử) nên không đổi mảng gốc. increase2 dùng index đổi trực tiếp mảng gốc (5,6,7 -> 6,7,8).",
    topic: "Arrays & Loops"
  },
  {
    id: 77,
    text: "Chọn phát biểu đúng về lập trình tổng quát (Generics) trong Java:",
    options: [
      "Có thể lập trình tổng quát cho lớp",
      "Có thể lập trình tổng quát cho phương thức",
      "Một lớp có thể khai báo số lượng kiểu dữ liệu tổng quát tùy ý",
      "Một phương thức chỉ có thể khai báo tối đa 1 kiểu dữ liệu tổng quát",
      "Không thể khai báo ràng buộc kiểu dữ liệu tổng quát cho lớp"
    ],
    correctAnswers: [
      "Có thể lập trình tổng quát cho lớp",
      "Có thể lập trình tổng quát cho phương thức",
      "Một lớp có thể khai báo số lượng kiểu dữ liệu tổng quát tùy ý"
    ],
    explanation: "Phương thức có thể có nhiều tham số generic (<K, V>). Có thể ràng buộc kiểu (<T extends Person>).",
    topic: "Generics"
  },
  {
    id: 78,
    text: "Chọn TẤT CẢ những phát biểu đúng về đoạn code sau (Manager < Employee < Person):",
    code: `1. Person p1 = new Manager();
2. Employee e = (Employee) p1;
3. Person p2 = new Employee();
4. Manager m = (Manager) p2;`,
    options: [
      "Dòng 1 là upcasting",
      "Dòng 2 là downcasting",
      "Dòng 4 gây lỗi thực thi (ClassCastException)",
      "Không dòng nào bị lỗi biên dịch"
    ],
    correctAnswers: [
      "Dòng 1 là upcasting",
      "Dòng 2 là downcasting",
      "Dòng 4 gây lỗi thực thi (ClassCastException)",
      "Không dòng nào bị lỗi biên dịch"
    ],
    explanation: "Dòng 4 ép kiểu Employee về Manager (Downcasting) nhưng đối tượng thực là Employee nên lỗi Runtime.",
    topic: "Casting"
  },
  {
    id: 79,
    text: "Đoạn mã sau in ra gì?",
    code: `public class A {
    String s; A a;
    public A(String s) { this.s = s; }
    public static void main(String[] args) {
        A a1 = new A("first");
        A a2 = new A("second");
        a1.a = a2;
        a2.a = a1;
        System.out.print(a1.a.s);
        System.out.print(a2.a.s);
    }
}`,
    options: ["secondfirst", "nullnull", "firstsecond", "Báo lỗi"],
    correctAnswers: ["secondfirst"],
    explanation: "a1.a trỏ tới a2 (s=\"second\"). a2.a trỏ tới a1 (s=\"first\"). In ra a2.s rồi a1.s.",
    topic: "Object References"
  },
  {
    id: 80,
    text: "Sắp xếp các kiểu dữ liệu theo chiều nới rộng dần dữ liệu (độ lớn bộ nhớ/phạm vi):",
    options: [
      "byte < short < char < int < long < float < double",
      "byte < char < short < float < long < double",
      "byte < short < char < float < long < double",
      "Không phải là đáp án nào trong các đáp án còn lại"
    ],
    correctAnswers: ["Không phải là đáp án nào trong các đáp án còn lại"],
    explanation: "Thứ tự đúng về độ rộng (widening conversion): byte -> short -> int -> long -> float -> double. (char chuyển sang int). Lưu ý float (4 byte) có phạm vi biểu diễn lớn hơn long (8 byte).",
    topic: "Primitive Types"
  },
  {
    id: 81,
    text: "Đoạn mã sau khi chạy in ra gì?",
    code: `interface P { String p = "PPP"; String methodP(); }
interface Q extends P { String q = "QQQ"; String methodQ(); }
class R implements P, Q {
    public String methodP() { return q + p; }
    public String methodQ() { return p + q; }
}
// main: R r = new R(); System.out.print(r.methodP()); System.out.print(r.methodQ());`,
    options: ["QQQPPPPPPPQQQQ", "PPPPQQQQPPPPQQQQ", "Báo lỗi biên dịch", "QQQPPPPQQQQPPPP"],
    correctAnswers: ["QQQPPPPPPPQQQQ"],
    explanation: "methodP trả về q+p (QQQPPP). methodQ trả về p+q (PPPQQQ). Ghép lại: QQQPPPPPPQQQ.",
    topic: "Interfaces"
  },
  {
    id: 82,
    text: "Kết quả in ra màn hình là gì?",
    code: `String[] s = {"abc", "123", null};
for (int i=0; i<s.length; i++) {
    try {
        int a = s[i].length();
        try { a = Integer.parseInt(s[i]); }
        catch (NumberFormatException ex) { System.out.print("NumberFormatException "); }
    } catch (NullPointerException ex) { System.out.print("NullPointerException "); }
}`,
    options: [
      "NullPointerException NumberFormatException",
      "abc 123 null",
      "NumberFormatException NullPointerException"
    ],
    correctAnswers: ["NumberFormatException NullPointerException"],
    explanation: "i=0 (abc): length ok, parseInt lỗi -> in NumberFormat. i=1 (123): ok. i=2 (null): length lỗi -> in NullPointer.",
    topic: "Exception Handling"
  },
  {
    id: 83,
    text: "Kết quả thực thi đoạn chương trình sau là gì?",
    code: `public class Test {
    static int index = 0;
    void increase() { index++; }
    public static void main(String[] args) {
        increase();
        System.out.println(index);
    }
}`,
    options: ["In ra 1", "In ra 0", "Lỗi biên dịch"],
    correctAnswers: ["Lỗi biên dịch"],
    explanation: "Phương thức `increase()` không phải static, không thể gọi trực tiếp từ `main` (static context).",
    topic: "Static vs Instance"
  },
  {
    id: 84,
    text: "Chọn phát biểu đúng về xử lý sự kiện trong JavaFX:",
    options: [
      "JavaFX hỗ trợ xử lý sự kiện chuột, bàn phím với MouseEvent và KeyEvent",
      "Để xử lý sự kiện rê chuột (drag), sử dụng lớp DragEvent",
      "JavaFX cung cấp handlers và filters để xử lý sự kiện",
      "Khi xử lý sự kiện, filter được gọi trước, handler được gọi sau",
      "Một node có thể đăng ký nhiều handler/filter"
    ],
    correctAnswers: [
      "JavaFX hỗ trợ xử lý sự kiện chuột, bàn phím với MouseEvent và KeyEvent",
      "Để xử lý sự kiện rê chuột (drag), sử dụng lớp DragEvent",
      "JavaFX cung cấp handlers và filters để xử lý sự kiện",
      "Khi xử lý sự kiện, filter được gọi trước, handler được gọi sau",
      "Một node có thể đăng ký nhiều handler/filter"
    ],
    explanation: "Tất cả các ý trên đều đúng về cơ chế Event Handling của JavaFX.",
    topic: "JavaFX"
  },
  {
    id: 85,
    text: "Chọn những phát biểu đúng về 2 phương thức sau:",
    code: `public void print1(ArrayList<Employee> list) { ... }
public void print2(ArrayList<? extends Employee> list) { ... }`,
    options: [
      "Trong phương thức print2 không thể thêm mới phần tử vào list, print1 có thể",
      "Hai phương thức hoàn toàn tương đương",
      "Danh sách truyền vào print2 chỉ được chứa lớp con của Employee"
    ],
    correctAnswers: ["Trong phương thức print2 không thể thêm mới phần tử vào list, print1 có thể"],
    explanation: "`? extends Employee` là wildcard (read-only logic cho generic collection), không an toàn để `add` phần tử mới (trừ null).",
    topic: "Generics Wildcards"
  },
  {
    id: 86,
    text: "Kết quả in ra màn hình của `p1.age` và `p2.age`?",
    code: `// increaseAge: p.setAge(p.getAge() + 1);
// swap: p1 = p2; p2 = tmp; (chỉ đổi tham chiếu cục bộ)
Person p1 = new Person(15);
Person p2 = new Person(20);
increaseAge(p1);
swap(p1, p2);`,
    options: ["16 20", "15 20", "20 16"],
    correctAnswers: ["16 20"],
    explanation: "`increaseAge` thay đổi thuộc tính thật sự (15->16). `swap` chỉ hoán đổi biến cục bộ tham chiếu, không ảnh hưởng `p1, p2` ở main.",
    topic: "Pass-by-value"
  },
  {
    id: 87,
    text: "Kết quả in ra màn hình?",
    code: `// Person(): in "0null "
// Employee(age, name): gọi super(age, name)
Employee e1 = new Employee(); // Gọi constructor mặc định -> gọi super()
Employee e2 = new Employee(16, "Huy");
System.out.print(e2.age + " " + e2.name);`,
    options: ["0null 16 Huy", "Lỗi biên dịch", "null 0 16 Huy"],
    correctAnswers: ["0null 16 Huy"],
    explanation: "e1 khởi tạo gọi super() in giá trị mặc định. e2 khởi tạo gán giá trị 16, Huy.",
    topic: "Constructors"
  },
  {
    id: 88,
    text: "Đoạn mã sau khi chạy in ra gì (Overloading/Overriding)?",
    code: `class A { String m(String s) { return s+s; } }
class B extends A { String m(String s, double d) { return m(s+d); } } // call super.m
class C extends B { String m(String s, double d, int i) { return m(s, d+i); } } // call super.m
// main: new C().m("CHECK", 12.34, 56);`,
    options: ["CHECK68.34CHECK68.34", "Lỗi", "CHECK12.3456..."],
    correctAnswers: ["CHECK68.34CHECK68.34"],
    explanation: "C gọi B (12.34 + 56 = 68.34). B gọi A (chuỗi \"CHECK68.34\"). A gấp đôi chuỗi.",
    topic: "Polymorphism"
  },
  {
    id: 89,
    text: "Đoạn mã sau in ra gì? (Overload resolution)",
    code: `static void method(A a) { System.out.println("A"); }
static void method(B b) { System.out.println("B"); }
static void method(Object o) { System.out.println("Obj"); }
// main: C c = new C(); method(c); (C extends B, B extends A)`,
    options: ["A", "B", "Obj"],
    correctAnswers: ["B"],
    explanation: "Chọn phương thức có tham số cụ thể nhất phù hợp với kiểu đối tượng. C là con B, B cụ thể hơn A và Object.",
    topic: "Overloading"
  },
  {
    id: 90,
    text: "Chọn phương thức gây lỗi biên dịch khi đặt vào Sub class (Super có `String getName() { return \"Super\"; }`)?",
    options: [
      "public String getTen() {}",
      "public void getName(String str) {}",
      "public String getName() { return \"Sub\"; }",
      "public void getName() {}"
    ],
    correctAnswers: ["public void getName() {}"],
    explanation: "Phương thức này cùng tên, cùng tham số với lớp cha (getName) nhưng khác kiểu trả về (void vs String) -> Không phải override, không phải overload -> Lỗi.",
    topic: "Overriding Rules"
  },
  {
    id: 91,
    text: "Chỉ định nào có thể dùng để khai báo một trường (thuộc tính)?",
    options: ["abstract", "final", "const", "public", "private"],
    correctAnswers: ["final", "public", "private"],
    explanation: "Java không có `const`. `abstract` chỉ dùng cho lớp/phương thức.",
    topic: "Modifiers"
  },
  {
    id: 92,
    text: "Lựa chọn nào đúng về quan hệ giữa các lớp (OToTai extends OTo, OTo có DongCo)?",
    options: [
      "Mối quan hệ giữa OToTai và PhuongTien là kế thừa",
      "Đối tượng OToTai kế thừa 1 DongCo và 4 BanhXe từ OTo",
      "Đối tượng OToTai có thể lên ga, tăng tốc",
      "Mối quan hệ giữa OToTai và DongCo là kế thừa",
      "Tất cả đúng trừ ý về quan hệ OToTai-DongCo"
    ],
    correctAnswers: ["Tất cả đúng trừ ý về quan hệ OToTai-DongCo"],
    explanation: "OToTai và DongCo là quan hệ 'has-a' (kết tập/hợp thành), không phải kế thừa 'is-a'.",
    topic: "OOP Relationships"
  },
  {
    id: 93,
    text: "Chọn các loại được sử dụng để truyền tham số theo tham chiếu (thực chất là tham chiếu đến object)?",
    options: ["int", "Mảng (Array)", "byte", "float", "String"],
    correctAnswers: ["Mảng (Array)", "String"],
    explanation: "Mảng và String là Object. Các kiểu còn lại là nguyên thủy (Primitive) truyền giá trị.",
    topic: "Parameter Passing"
  },
  {
    id: 94,
    text: "Lựa chọn đúng về Đóng gói dữ liệu:",
    options: [
      "Giúp chương trình chạy nhanh hơn",
      "Cho phép thay đổi thiết kế bên trong mà giao diện bên ngoài không đổi",
      "Bảo vệ dữ liệu không bị thay đổi tùy tiện",
      "Là một dạng của che giấu dữ liệu"
    ],
    correctAnswers: [
      "Cho phép thay đổi thiết kế bên trong mà giao diện bên ngoài không đổi",
      "Bảo vệ dữ liệu không bị thay đổi tùy tiện",
      "Là một dạng của che giấu dữ liệu"
    ],
    explanation: "Đóng gói (Encapsulation) liên quan đến bảo trì và bảo mật, không phải hiệu năng.",
    topic: "Encapsulation"
  },
  {
    id: 95,
    text: "Kỹ thuật nào giúp tái sử dụng mã nguồn trong Java?",
    options: ["Đa kế thừa", "Kết tập (Aggregation)", "Đơn kế thừa", "Chồng phương thức", "Đóng gói"],
    correctAnswers: ["Kết tập (Aggregation)", "Đơn kế thừa"],
    explanation: "Java không hỗ trợ đa kế thừa class. Overloading và Đóng gói không phải kỹ thuật chính để 'tái sử dụng' code từ lớp khác.",
    topic: "Code Reusability"
  },
  {
    id: 96,
    text: "Chọn các lựa chọn đúng về Constructor:",
    options: [
      "Constructor có thể gọi constructor khác trong cùng lớp dùng this(...)",
      "Constructor có thể gọi constructor lớp cha dùng super(...)",
      "Constructor có thể gọi constructor lớp cha dùng this(...)"
    ],
    correctAnswers: [
      "Constructor có thể gọi constructor khác trong cùng lớp dùng this(...)",
      "Constructor có thể gọi constructor lớp cha dùng super(...)"
    ],
    explanation: "Cú pháp đúng để gọi constructor cha là `super()`, gọi constructor cùng lớp là `this()`.",
    topic: "Constructors"
  },
  {
    id: 97,
    text: "Chọn các phương thức overload hợp lệ cho Constructor `Student(String name, int age)`?",
    options: [
      "Student() {}",
      "protected int Student() {}",
      "private Student(int age, String name) {}",
      "public Object Student(...) {}"
    ],
    correctAnswers: ["Student() {}", "private Student(int age, String name) {}"],
    explanation: "Constructor không có kiểu trả về (không void, không int...).",
    topic: "Overloading Constructors"
  },
  {
    id: 98,
    text: "Chọn phát biểu đúng về đoạn mã: `class A { A(){} } class B extends A {}`",
    options: [
      "A có 2 phương thức khởi tạo",
      "Constructor lớp B là public",
      "Constructor lớp B không có tham số",
      "Constructor lớp B chứa lời gọi super()"
    ],
    correctAnswers: [
      "Constructor lớp B là public", // (Nếu class B public) - thực tế là cùng modifier với class hoặc default
      "Constructor lớp B không có tham số",
      "Constructor lớp B chứa lời gọi super()"
    ],
    explanation: "B không khai báo constructor -> Java sinh default constructor: `B() { super(); }`.",
    topic: "Default Constructor"
  },
  {
    id: 99,
    text: "Chọn phương thức override hợp lệ cho `protected int method1(int a, int b)` của lớp A?",
    options: [
      "public int method1(int a, int b)",
      "private int method1(int a, int b)",
      "private int method1(int a, long b)",
      "public short method1(int a, int b)",
      "static protected int method1..."
    ],
    correctAnswers: ["public int method1(int a, int b)"],
    explanation: "Override được mở rộng visibility (protected -> public). Không được thu hẹp (-> private). Không đổi kiểu trả về (-> short). Không đổi thành static.",
    topic: "Overriding Rules"
  },
  {
    id: 100,
    text: "Trong một lớp con, phương thức nào KHÔNG thể được ghi đè (override)?",
    options: ["private", "public", "static", "final", "constructor"],
    correctAnswers: ["private", "static", "final", "constructor"],
    explanation: "Chỉ phương thức instance (không static), không final, và có thể truy cập (không private) mới override được. Constructor không phải method thường nên không override.",
    topic: "Overriding Restrictions"
  },
  {
    id: 101,
    text: "Kết quả của đoạn code sau là gì?",
    code: `public static void main(String[] args) {
    byte b = 6;
    b += 8; // Dòng 4
    System.out.println(b);
    b = b + 7; // Dòng 6
    System.out.println(b);
}`,
    options: ["14 21", "14 13", "Lỗi biên dịch tại dòng 6", "Lỗi biên dịch tại dòng 4"],
    correctAnswers: ["Lỗi biên dịch tại dòng 6"],
    explanation: "Dòng b += 8 hợp lệ do ép kiểu ngầm định. Dòng b = b + 7 lỗi biên dịch vì 7 là int, kết quả cộng là int, không thể gán trực tiếp vào byte mà không ép kiểu tường minh.",
    topic: "Data Types & Casting"
  },
  {
    id: 102,
    text: "Cho 3 lớp Person, Employee và Manager. Những lớp nào sẽ bị lỗi biên dịch?",
    code: `abstract class Person {
    protected String name;
    public abstract String print();
}
abstract class Employee extends Person {
    public String print() { return name; }
}
class Manager extends Employee {
    protected String print() { return "Manager" + name; }
}`,
    options: ["Lớp Person", "Lớp Employee", "Lớp Manager", "Không lớp nào bị lỗi"],
    correctAnswers: ["Lớp Manager"],
    explanation: "Khi ghi đè (override), phạm vi truy cập không được hẹp hơn lớp cha. Employee.print() là public, nên Manager.print() không thể là protected.",
    topic: "Overriding Rules"
  },
  {
    id: 103,
    text: "Lựa chọn nào là chính xác về kết quả đoạn chương trình sau (Class B cùng package Class A)?",
    code: `class A {
    int a = 5;
    protected int b = 6;
    public int c = 7;
}
public class B {
    public static void main(String[] args) {
        A a = new A();
        System.out.print("" + a.a + a.b + a.c);
    }
}`,
    options: [
      "Lỗi khi biên dịch ở dòng truy cập a.a",
      "Lỗi khi biên dịch ở dòng truy cập a.b",
      "Chương trình chạy thành công và in ra màn hình 567",
      "Exception khi chạy"
    ],
    correctAnswers: ["Chương trình chạy thành công và in ra màn hình 567"],
    explanation: "Cùng package nên B có thể truy cập biến default (a), protected (b) và public (c) của A.",
    topic: "Access Modifiers"
  },
  {
    id: 104,
    text: "Đoạn mã sau khi chạy in ra gì?",
    code: `public class Main {
    public Main(int i, int j) {
        System.out.println(method(i, j));
    }
    int method(int i, int j) {
        return i++ + ++j;
    }
    public static void main(String[] ss) {
        Main main = new Main(123, 456);
    }
}`,
    options: ["581", "579", "580"],
    correctAnswers: ["580"],
    explanation: "i++ (postfix) dùng giá trị cũ 123. ++j (prefix) tăng lên 457 rồi dùng. Kết quả: 123 + 457 = 580.",
    topic: "Operators"
  },
  {
    id: 105,
    text: "Đoạn mã sau khi chạy in ra gì?",
    code: `class X { int method(int i) { return i *= i; } }
class Y extends X { double method(double d) { return d /= d; } }
class Z extends Y { float method(float f) { return f += f; } }
// main: Z z = new Z(); System.out.println(z.method(210.2));`,
    options: ["1.0", "Báo lỗi biên dịch", "210.2", "420.4"],
    correctAnswers: ["1.0"],
    explanation: "Tham số 210.2 là double, khớp với method(double) của lớp Y. 210.2 / 210.2 = 1.0.",
    topic: "Overloading"
  },
  {
    id: 106,
    text: "Chọn phát biểu SAI về lớp trừu tượng (abstract class):",
    options: [
      "Không thể tạo thể hiện trực tiếp của lớp trừu tượng",
      "Lớp trừu tượng thường dùng làm lớp cơ sở",
      "Lớp trừu tượng phải có ít nhất 1 phương thức trừu tượng",
      "Lớp trừu tượng có thể có hoặc không có constructor"
    ],
    correctAnswers: ["Lớp trừu tượng phải có ít nhất 1 phương thức trừu tượng"],
    explanation: "Một lớp có thể khai báo là abstract mà không cần chứa bất kỳ phương thức abstract nào.",
    topic: "Abstract Classes"
  },
  {
    id: 107,
    text: "Có thể dùng những chỉ định truy cập nào với phương thức khởi tạo?",
    options: ["public", "package (default)", "protected", "private", "Tất cả các đáp án trên"],
    correctAnswers: ["Tất cả các đáp án trên"],
    explanation: "Constructor có thể sử dụng mọi loại access modifier.",
    topic: "Constructors"
  },
  {
    id: 108,
    text: "Đoạn mã sau khi chạy in ra gì?",
    code: `class M {
    int i = 50;
    public M(int j) {
        System.out.print(i);
        this.i = j * 10;
    }
}
class N extends M {
    public N(int j) {
        super(j);
        System.out.print(i);
        this.i = j * 20;
    }
}
// main: N n = new N(25); System.out.print(n.i);`,
    options: ["02500500", "0500", "505050", "50250500"],
    correctAnswers: ["50250500"],
    explanation: "Gọi M(25): in 50, i=250. Gọi N(25): in 250, i=500. Main in 500.",
    topic: "Constructor Chaining"
  },
  {
    id: 109,
    text: "Đoạn mã sau khi chạy in ra gì?",
    code: `class A { int i = 200; }
class B extends A { int i = 100; }
public class Test {
    public static void main(String[] ss) {
        B a = new B();
        System.out.println(a.i);
    }
}`,
    options: ["100", "Báo lỗi biên dịch", "200"],
    correctAnswers: ["100"],
    explanation: "Biến tham chiếu kiểu B nên truy cập biến i của B (Variable Shadowing).",
    topic: "Variable Shadowing"
  },
  {
    id: 110,
    text: "Kết quả in ra màn hình khi thực thi đoạn code sau là gì?",
    code: `Person p1 = new Person(20, "Hung");
Person p2 = new Person(20, "Hung");
Person p3 = p2;
System.out.print((p1 == p2) + " ");
System.out.print(p1.equals(p2) + " ");
System.out.print((p1 == p3) + " ");
System.out.print((p2 == p3) + " ");`,
    options: [
      "false false false true",
      "true true false true",
      "true true true true"
    ],
    correctAnswers: ["false false false true"],
    explanation: "p1!=p2 (khác vùng nhớ). equals mặc định so sánh địa chỉ -> false. p3 trỏ tới p2 -> p2==p3 true.",
    topic: "Object Comparison"
  },
  {
    id: 111,
    text: "Nhận định nào sau đây đúng về câu lệnh 'a = b' (A là cha của B)?",
    code: `A a = new A();
B b = new B();
a = b;`,
    options: [
      "Là chuyển đổi kiểu dữ liệu tham chiếu upcasting",
      "Là chuyển đổi kiểu dữ liệu tham chiếu downcasting",
      "Là peertopeercasting"
    ],
    correctAnswers: ["Là chuyển đổi kiểu dữ liệu tham chiếu upcasting"],
    explanation: "Gán con cho cha là Upcasting.",
    topic: "Casting"
  },
  {
    id: 112,
    text: "Kết quả khi lần lượt thực thi: f((byte)5), f(6), f('c'), f(5.5), f(7L)?",
    options: [
      "int, int, char, float, long",
      "int, int, char, lỗi biên dịch, long",
      "char, int, char, float, long"
    ],
    correctAnswers: ["int, int, char, lỗi biên dịch, long"],
    explanation: "5.5 là double, không có hàm f(double), không tự ép về float/long/int -> Lỗi.",
    topic: "Overloading"
  },
  {
    id: 113,
    text: "Chọn phát biểu đúng về đoạn code sau (C extends B, B extends A):",
    code: `ArrayList<B> list1 = new ArrayList<B>();
ArrayList<A> list2 = (ArrayList<A>) list1; // Dòng 2
ArrayList<C> list3 = (ArrayList<C>) list1; // Dòng 3`,
    options: [
      "Dòng 2 không có lỗi biên dịch",
      "Dòng 3 không có lỗi biên dịch",
      "Cả dòng 2 và 3 đều có lỗi biên dịch"
    ],
    correctAnswers: ["Cả dòng 2 và 3 đều có lỗi biên dịch"],
    explanation: "Generic trong Java là bất biến (invariant). ArrayList<B> không phải là con của ArrayList<A>.",
    topic: "Generics"
  },
  {
    id: 114,
    text: "Đoạn mã sau khi chạy in ra gì?",
    code: `// main gọi nestedTry() trong khối try-catch(Exception)
static void nestedTry() {
    try {
        int i = Integer.parseInt("abc"); // Gây NumberFormatException
    } catch (NullPointerException ex) {
        System.out.println("BBB");
    }
}
// catch ở main in "AAA"`,
    options: ["BBB", "Không in ra gì", "AAA", "BBBAAA"],
    correctAnswers: ["AAA"],
    explanation: "Lỗi NumberFormatException không bị bắt trong nestedTry (chỉ bắt NullPointer), nên ném ra main và bị bắt ở đó.",
    topic: "Exception Handling"
  },
  {
    id: 115,
    text: "Những khai báo mảng nào trong JAVA bị lỗi?",
    code: `1. boolean bit[] = new boolean[5];
2. float value[] = new float[2*3];
3. int[] number1 = {10,9,8};
4. int number2[] = new int[]{10, 9};`,
    options: ["Tất cả khai báo đều đúng", "Chỉ 3 sai", "Chỉ 4 sai"],
    correctAnswers: ["Tất cả khai báo đều đúng"],
    explanation: "Cú pháp khai báo mảng Java khá linh hoạt.",
    topic: "Arrays"
  },
  {
    id: 116,
    text: "Chọn những phát biểu đúng về kỹ thuật ghi đè (overriding):",
    options: [
      "Phương thức lớp con phải có cùng chữ ký với lớp cha",
      "Kiểu trả về phải giống hoặc là kiểu con (covariant)",
      "Access modifier không được chặt hơn",
      "Không được ném ngoại lệ mới hoặc rộng hơn",
      "Tất cả các ý trên"
    ],
    correctAnswers: ["Tất cả các ý trên"],
    explanation: "Các quy tắc cơ bản của Overriding.",
    topic: "Overriding Rules"
  },
  {
    id: 117,
    text: "Đối tượng trong chương trình Java được cấp phát trong loại bộ nhớ nào?",
    options: ["Bộ nhớ RAM (Heap)", "Bộ nhớ ROM", "Bộ nhớ Cache"],
    correctAnswers: ["Bộ nhớ RAM (Heap)"],
    explanation: "Object nằm trên Heap (thuộc RAM).",
    topic: "Memory Management"
  },
  {
    id: 118,
    text: "Chọn phát biểu đúng về giao diện (interface):",
    options: [
      "Là kiểu dữ liệu trừu tượng đặc tả hành vi",
      "Giúp mô phỏng đa thừa kế",
      "Giúp giảm sự phụ thuộc (loose coupling)",
      "Tất cả các ý trên"
    ],
    correctAnswers: ["Tất cả các ý trên"],
    explanation: "Interface dùng để định nghĩa contract, đa thừa kế behavior và decoupling.",
    topic: "Interfaces"
  },
  {
    id: 119,
    text: "Chương trình in ra gì khi chạy lệnh 'java Test' (không tham số)?",
    code: `if(args.length > 0) System.out.println(args.length);`,
    options: [
      "In ra 0",
      "Chương trình chạy thành công, không in gì",
      "Lỗi biên dịch"
    ],
    correctAnswers: ["Chương trình chạy thành công, không in gì"],
    explanation: "Không tham số -> args.length = 0 -> điều kiện if sai.",
    topic: "Command Line Args"
  },
  {
    id: 120,
    text: "Nhận định nào đúng về chương trình sau?",
    code: `final class A { int i; }
class B extends A { ... } // Lỗi kế thừa
// main truy cập B.i (static access cho biến instance)`,
    options: ["Lỗi khi biên dịch chương trình", "Chạy in ra 2 3"],
    correctAnswers: ["Lỗi khi biên dịch chương trình"],
    explanation: "Lỗi 1: Kế thừa lớp final. Lỗi 2: Truy cập biến instance theo kiểu static.",
    topic: "Final Keyword"
  },
  {
    id: 121,
    text: "Kết quả in ra màn hình?",
    code: `// increaseAge: p.setAge(p.getAge() + 1);
// swap: đổi chỗ tham chiếu p1, p2 cục bộ
Person p1 = new Person(15);
Person p2 = new Person(20);
increaseAge(p1);
swap(p1, p2);
System.out.print(p1.getAge() + " " + p2.getAge());`,
    options: ["15 20", "16 20", "20 16"],
    correctAnswers: ["16 20"],
    explanation: "Tuổi p1 tăng lên 16. Swap không ảnh hưởng tham chiếu ở main.",
    topic: "Pass-by-value"
  },
  {
    id: 122,
    text: "Hai phương thức sau (ở 2 lớp rời rạc A và B) có chồng nhau (overload) không?",
    code: `class A { int method(int a) {...} }
class B { int method(int a, int b) {...} }`,
    options: ["Có", "Không"],
    correctAnswers: ["Không"],
    explanation: "Overloading xảy ra trong cùng 1 lớp (hoặc qua kế thừa). Hai lớp rời rạc không tạo thành overloading.",
    topic: "Overloading"
  },
  {
    id: 123,
    text: "Phát biểu nào SAI về gói (package) trong Java?",
    options: [
      "Tên gói theo quy ước viết thường",
      "Gói giúp xác định phạm vi hoạt động của lớp",
      "Cho lớp nào vào gói nào là tùy ý, không cần quan tâm quan hệ",
      "Gói giúp tổ chức mã nguồn"
    ],
    correctAnswers: ["Cho lớp nào vào gói nào là tùy ý, không cần quan tâm quan hệ"],
    explanation: "Nên gom nhóm các lớp liên quan vào cùng package để dễ quản lý.",
    topic: "Packages"
  },
  {
    id: 124,
    text: "Từ khóa được dùng để định nghĩa một giao diện là:",
    options: ["intf", "Intf", "interface", "Interface"],
    correctAnswers: ["interface"],
    explanation: "Từ khóa chuẩn trong Java.",
    topic: "Keywords"
  },
  {
    id: 125,
    text: "Đoạn mã sau khi chạy trả về giá trị gì?",
    code: `try { i = 1; return i; }
finally { i = 3; }`,
    options: ["1", "3", "0"],
    correctAnswers: ["1"],
    explanation: "Giá trị return được lưu lại trước khi vào finally. Finally thay đổi i nhưng không có lệnh return đè lên.",
    topic: "Exception Handling"
  },
  {
    id: 126,
    text: "Lớp Person bị lỗi ở dòng nào?",
    code: `class Person implements Printable, Stringable { ... }
// main:
Printable p1 = new Printable(); // Dòng 10
Printable p2 = new Person();
String name = p2.stringify();   // Dòng 12 (stringify thuộc Stringable)`,
    options: ["Dòng 10", "Dòng 12", "Cả 10 và 12"],
    correctAnswers: ["Cả 10 và 12"],
    explanation: "Dòng 10: New Interface. Dòng 12: Gọi phương thức không có trong kiểu tham chiếu Printable.",
    topic: "Interfaces"
  },
  {
    id: 127,
    text: "Kết quả đoạn mã xử lý String/StringBuffer?",
    code: `String s1 = "Ab"; // m1, m2 không đổi s1 gốc -> "Ab"
StringBuffer s2 = "CdE";
m3(s2); // delete(0,1) -> "dE"
m4(s2); // delete(0,1) -> "E"`,
    options: ["Ab E", "AbABAb dEEE", "abABAB DEEE"],
    correctAnswers: ["AbABAb dEEE"],
    explanation: "Dựa vào thứ tự in trong các hàm m1, m2, m3, m4 và main.",
    topic: "String vs StringBuffer"
  },
  {
    id: 128,
    text: "Lớp nào bị lỗi biên dịch khi ghi đè `write` throws RuntimeException?",
    options: ["HTMLWriter (throws RuntimeException)", "CSVWriter (throws Exception)", "TEXTWriter (throws ArithmeticException)"],
    correctAnswers: ["CSVWriter (throws Exception)"],
    explanation: "Ghi đè không được ném Checked Exception rộng hơn (Exception > RuntimeException).",
    topic: "Exception Handling"
  },
  {
    id: 129,
    text: "Chương trình chứa 2 lớp public `Hello` và `HelloWorld` trong cùng 1 file thì sao?",
    options: ["Chạy bình thường", "Lỗi khi biên dịch"],
    correctAnswers: ["Lỗi khi biên dịch"],
    explanation: "Mỗi file Java chỉ được chứa tối đa 1 class public.",
    topic: "Java File Structure"
  },
  {
    id: 130,
    text: "Kết quả phép tính: 3.0/0; 0/4.0; 0/0.0?",
    options: [
      "Infinity, 0.0, NaN",
      "Lỗi Runtime",
      "NaN, 0.0, Infinity"
    ],
    correctAnswers: ["Infinity, 0.0, NaN"],
    explanation: "Số thực chia 0 ra Infinity. 0 chia 0.0 ra NaN.",
    topic: "Floating Point Arithmetic"
  },
  {
    id: 131,
    text: "Kết quả đoạn code try-catch?",
    code: `Employee e; // Chưa khởi tạo
try { System.out.println(e.toString()); }
catch (Exception ex) { ... }
catch (RuntimeException ex) { ... } // Lỗi thứ tự`,
    options: ["Lỗi biên dịch"],
    correctAnswers: ["Lỗi biên dịch"],
    explanation: "Lỗi 1: Catch con (Runtime) phải đứng trước cha (Exception). Lỗi 2: Biến e chưa khởi tạo.",
    topic: "Exception Handling"
  },
  {
    id: 132,
    text: "Kết quả in ra màn hình (Employee extends Person, Manager extends Employee)?",
    code: `// getDetail in chữ cái đầu class
o1 = new Employee(); o1.getDetail();
o2 = new Manager(); o2.getDetail();
o3 = new Person(); o3.getDetail();`,
    options: ["EMP", "PEM", "Lỗi"],
    correctAnswers: ["EMP"],
    explanation: "Đa hình: gọi phương thức của đối tượng thực tế (E -> M -> P).",
    topic: "Polymorphism"
  },
  {
    id: 133,
    text: "Phát biểu đúng về đóng gói (Encapsulation)?",
    options: [
      "Đóng gói giúp bảo vệ dữ liệu, che giấu thông tin",
      "Getter/Setter là công cụ của đóng gói",
      "Giúp mã nguồn an toàn hơn",
      "Tất cả đúng"
    ],
    correctAnswers: ["Tất cả đúng"],
    explanation: "Đóng gói bao gồm việc che giấu dữ liệu và cung cấp truy cập có kiểm soát.",
    topic: "Encapsulation"
  },
  {
    id: 134,
    text: "Có bao nhiêu thể hiện (instance) của Student được tạo?",
    code: `Student s1 = new Student(100);
Student s2 = new Student();
Student s3;`,
    options: ["1", "2", "3"],
    correctAnswers: ["2"],
    explanation: "Chỉ có s1 và s2 dùng từ khóa 'new'. s3 chỉ mới khai báo biến.",
    topic: "Object Creation"
  },
  {
    id: 135,
    text: "Đoạn mã sau bị lỗi biên dịch ở đâu?",
    code: `class A {
    public int check(double a) { return (int) a; }
    public double check(double a) { return a; } // Dòng 5
}`,
    options: ["Dòng 5", "Không lỗi"],
    correctAnswers: ["Dòng 5"],
    explanation: "Không thể overload phương thức chỉ bằng cách thay đổi kiểu trả về.",
    topic: "Overloading"
  },
  {
    id: 136,
    text: "Các chỉ định truy cập có thể dùng cho lớp (class) là gì?",
    options: ["public, private", "public, default", "protected, default"],
    correctAnswers: ["public, default"],
    explanation: "Top-level class chỉ có thể là public hoặc default (package-private).",
    topic: "Access Modifiers"
  },
  {
    id: 137,
    text: "Lớp Person bị lỗi ở dòng nào?",
    code: `class Person implements Stringable { ... }
// Stringable extends Printable (có print())
// Person chỉ implement stringify(), thiếu print()`,
    options: ["Dòng khai báo class Person", "Không lỗi"],
    correctAnswers: ["Dòng khai báo class Person"],
    explanation: "Person phải implement tất cả phương thức abstract của interface cha (Printable) và con (Stringable).",
    topic: "Interfaces"
  },
  {
    id: 137,
    text: "Chọn (các) phương thức dưới đây khi đặt vào dòng 5 trong đoạn mã trên gây ra lỗi biên dịch?",
    code: `class Super { public String getName() { return "Super"; } }
public class Sub extends Super {
    // Dòng 5
}`,
    options: [
      "public String getTen() {}",
      "public void getName(String str) {}",
      "public String getName() { return 'Sub'; }",
      "public void getName()"
    ],
    correctAnswers: ["public void getName()"],
    explanation: "Phương thức `public void getName()` có cùng tên và danh sách tham số với phương thức ở lớp cha (`public String getName()`) nhưng khác kiểu trả về (void vs String). Điều này không phải là ghi đè (overriding) hợp lệ, cũng không phải nạp chồng (overloading), nên gây lỗi biên dịch.",
    topic: "Overriding Rules"
  },
  {
    id: 138,
    text: "Hãy khoanh tròn vào (các) chỉ định có thể sử dụng để khai báo một trường (thuộc tính):",
    options: ["abstract", "final", "const", "public", "private"],
    correctAnswers: ["final", "public", "private"],
    explanation: "`abstract` chỉ dùng cho lớp và phương thức. `const` là từ khóa dự trữ nhưng không dùng trong Java. Các từ khóa hợp lệ cho thuộc tính là `final`, `public`, `private`, `protected`, `static`, `transient`, `volatile`.",
    topic: "Modifiers"
  },
  {
    id: 139,
    text: "Cho cấu trúc lớp: OTo extends PhuongTien, OToTai extends OTo. OTo có thuộc tính DongCo, BanhXe. (Các) lựa chọn nào sau đây là đúng?",
    options: [
      "Mối quan hệ giữa OToTai và PhuongTien là mối quan hệ kế thừa.",
      "Một đối tượng OToTai kế thừa các thuộc tính DongCo và BanhXe từ lớp cha OTo.",
      "Một đối tượng OToTai có thể lên ga và tăng tốc (phương thức của OTo).",
      "Mối quan hệ giữa OToTai và DongCo là quan hệ kế thừa.",
      "Tất cả các lựa chọn trên đều đúng."
    ],
    correctAnswers: [
      "Mối quan hệ giữa OToTai và PhuongTien là mối quan hệ kế thừa.",
      "Một đối tượng OToTai kế thừa các thuộc tính DongCo và BanhXe từ lớp cha OTo.",
      "Một đối tượng OToTai có thể lên ga và tăng tốc (phương thức của OTo)."
    ],
    explanation: "OToTai IS-A PhuongTien (kế thừa bắc cầu). OToTai kế thừa fields và methods của OTo. Quan hệ giữa OToTai và DongCo là HAS-A (Composition/Aggregation), không phải kế thừa.",
    topic: "Inheritance vs Composition"
  },
  {
    id: 140,
    text: "Chọn các loại sau đây được sử dụng để mô phỏng truyền tham số theo tham chiếu (tham biến) trong Java?",
    options: ["int", "Mảng (Array)", "byte", "float", "String", "Các kiểu dữ liệu nguyên thủy"],
    correctAnswers: ["Mảng (Array)", "String"],
    explanation: "Java luôn truyền tham trị (pass-by-value). Tuy nhiên, với các kiểu đối tượng (như Mảng, String, Object), giá trị được truyền là địa chỉ tham chiếu, nên các thay đổi bên trong đối tượng (nếu mutable) sẽ ảnh hưởng đến đối tượng gốc.",
    topic: "Parameter Passing"
  },
  {
    id: 141,
    text: "Hãy đưa ra (các) lựa chọn đúng về Đóng gói dữ liệu:",
    options: [
      "Đóng gói dữ liệu được sử dụng để giúp chương trình chạy nhanh hơn.",
      "Đóng gói dữ liệu cho phép thay đổi thiết kế bên trong của một lớp mà giao diện bên ngoài không bị thay đổi theo.",
      "Đóng gói dữ liệu bảo vệ dữ liệu không bị thay đổi tùy tiện.",
      "Đóng gói dữ liệu là một dạng của che giấu dữ liệu."
    ],
    correctAnswers: [
      "Đóng gói dữ liệu cho phép thay đổi thiết kế bên trong của một lớp mà giao diện bên ngoài không bị thay đổi theo.",
      "Đóng gói dữ liệu bảo vệ dữ liệu không bị thay đổi tùy tiện.",
      "Đóng gói dữ liệu là một dạng của che giấu dữ liệu."
    ],
    explanation: "Đóng gói (Encapsulation) giúp bảo trì và bảo mật code, không liên quan trực tiếp đến tốc độ thực thi (thậm chí có thể chậm hơn chút xíu do gọi qua method).",
    topic: "Encapsulation"
  },
  {
    id: 142,
    text: "(Các) kỹ thuật nào được hỗ trợ trong lập trình hướng đối tượng Java giúp tái sử dụng mã nguồn?",
    options: [
      "Đa kế thừa (Multiple Inheritance)",
      "Kết tập (Aggregation)",
      "Đơn kế thừa (Single Inheritance)",
      "Chồng phương thức (Method Overloading)",
      "Đóng gói (Encapsulation)"
    ],
    correctAnswers: ["Kết tập (Aggregation)", "Đơn kế thừa (Single Inheritance)"],
    explanation: "Kế thừa và Kết tập (Composition/Aggregation) là hai cách chính để tái sử dụng code của lớp khác. Java không hỗ trợ đa kế thừa class.",
    topic: "Code Reusability"
  },
  {
    id: 143,
    text: "Chọn hai lựa chọn đúng dưới đây về Constructor:",
    options: [
      "Số lượng lời gọi đến phương thức khởi tạo xuất hiện trong thân lớp phải nhỏ hơn hoặc bằng số lượng phương thức khởi tạo của lớp.",
      "Một phương thức khởi tạo có thể gọi phương thức khởi tạo khác trong cùng lớp sử dụng 'this(...)'",
      "Một phương thức khởi tạo có thể gọi phương thức khởi tạo của lớp cha sử dụng 'super(...)'",
      "Một phương thức khởi tạo có thể gọi phương thức khởi tạo của lớp cha sử dụng 'this(...)'"
    ],
    correctAnswers: [
      "Một phương thức khởi tạo có thể gọi phương thức khởi tạo khác trong cùng lớp sử dụng 'this(...)'",
      "Một phương thức khởi tạo có thể gọi phương thức khởi tạo của lớp cha sử dụng 'super(...)'"
    ],
    explanation: "Cú pháp chuẩn: `this()` gọi constructor cùng lớp, `super()` gọi constructor lớp cha.",
    topic: "Constructors"
  },
  {
    id: 144,
    text: "Chọn hai phương thức chồng (overload) hợp lệ cho phương thức khởi tạo `Student(String name, int age)`?",
    options: [
      "Student() {}",
      "protected int Student() {}",
      "private Student(int age, String name) {}",
      "public Object Student(String name, int age) {}",
      "public void Student(String name, byte age) {}"
    ],
    correctAnswers: ["Student() {}", "private Student(int age, String name) {}"],
    explanation: "Constructor không có kiểu trả về. Các lựa chọn có `int`, `Object`, `void` đều là phương thức thường, không phải constructor.",
    topic: "Overloading Constructors"
  },
  {
    id: 145,
    text: "Cho đoạn mã: `class A { A(){} } class B extends A {}`. Chọn các lựa chọn đúng?",
    options: [
      "A có 2 phương thức khởi tạo.",
      "Phương thức khởi tạo của lớp B là public.",
      "Phương thức khởi tạo của lớp B không có tham số.",
      "Phương thức khởi tạo của lớp B chứa lời gọi đến super()."
    ],
    correctAnswers: [
      "Phương thức khởi tạo của lớp B là public.",
      "Phương thức khởi tạo của lớp B không có tham số.",
      "Phương thức khởi tạo của lớp B chứa lời gọi đến super()."
    ],
    explanation: "Lớp A định nghĩa tường minh 1 constructor `A()`, nên không có default constructor nữa. Lớp B không định nghĩa constructor nào, trình biên dịch tạo default constructor: `public B() { super(); }` (nếu B public).",
    topic: "Default Constructor"
  },
  {
    id: 146,
    text: "Chọn hai phương thức override đúng trong lớp con của A (A có `protected int method1(int a, int b)`)?",
    options: [
      "public int method1(int a, int b) { return 0; }",
      "private int method1(int a, int b) { return 0; }",
      "private int method1(int a, long b) { return 0; }",
      "public short method1(int a, int b) { return 0; }",
      "static protected int method1(int a, int b) { return 0; }"
    ],
    correctAnswers: [
      "public int method1(int a, int b) { return 0; }",
      "private int method1(int a, long b) { return 0; }"
    ],
    explanation: "Câu đầu tiên là Override hợp lệ (nới rộng access modifier). Câu thứ 3 thực chất là Overload (khác tham số long b), nên nó vẫn là một phương thức hợp lệ trong lớp con (dù đề bài hỏi hơi lắt léo). Override sai: hẹp quyền truy cập (private), khác kiểu trả về (short), đổi thành static.",
    topic: "Overriding vs Overloading"
  },
  {
    id: 147,
    text: "Trong một lớp con, phương thức nào không thể được ghi đè (override)?",
    options: ["private", "public", "static", "final", "constructor"],
    correctAnswers: ["private", "static", "final", "constructor"],
    explanation: "Chỉ có phương thức instance public/protected/default (cùng gói) và không final mới được override.",
    topic: "Overriding Restrictions"
  },
  {
    id: 148,
    text: "Cho lớp D có các method m1(protected), m2(private), m3(default), m4(public). Lớp E gọi d.m1(), d.m2(), d.m3(), d.m4(). Lỗi ở đâu?",
    options: ["Lỗi biên dịch tại gọi m2", "Lỗi biên dịch tại gọi m1", "Không lỗi"],
    correctAnswers: ["Lỗi biên dịch tại gọi m2"],
    explanation: "m2 là private, chỉ truy cập được từ bên trong lớp D.",
    topic: "Access Modifiers"
  },
  {
    id: 149,
    text: "Chồng phương thức (Overloading) giúp gì?",
    options: [
      "Chương trình chạy nhanh hơn",
      "Chương trình nhỏ gọn hơn",
      "Đơn giản hóa các đối tượng phức tạp để ta hiểu chúng hơn",
      "Lý do khác"
    ],
    correctAnswers: ["Đơn giản hóa các đối tượng phức tạp để ta hiểu chúng hơn"],
    explanation: "Giúp code dễ đọc, dễ nhớ (cùng tên cho các hành động tương tự trên các kiểu dữ liệu khác nhau).",
    topic: "Overloading Benefits"
  },
  {
    id: 150,
    text: "Cho `Integer a=new Integer(10); Integer b=new Integer(10); Integer c=a; int d=10; double e=10.0;`. Chọn các biểu thức trả về true?",
    options: ["a==c", "b==d", "b==c", "d==e", "a==b", "d==10.0"],
    correctAnswers: ["a==c", "b==d", "d==e", "d==10.0"],
    explanation: "a==c (cùng tham chiếu). b==d (unboxing 10==10). d==e (10==10.0). a!=b (khác tham chiếu).",
    topic: "Wrapper Classes & Equality"
  },
  {
    id: 151,
    text: "Câu nào đúng về lớp trừu tượng và giao diện?",
    options: [
      "Giao diện có thể chứa các phương thức không trừu tượng (non-abstract).",
      "Một lớp có thể kế thừa từ nhiều lớp trừu tượng.",
      "Một lớp có thể thực thi từ nhiều giao diện.",
      "Tất cả các phương thức trong một giao diện phải là trừu tượng."
    ],
    correctAnswers: [
      "Giao diện có thể chứa các phương thức không trừu tượng (non-abstract).",
      "Một lớp có thể thực thi từ nhiều giao diện."
    ],
    explanation: "Từ Java 8, interface có thể có `default` và `static` method. Một lớp có thể implements nhiều interface.",
    topic: "Interface vs Abstract Class"
  },
  {
    id: 152,
    text: "Loại dữ liệu nào có thể dùng cho biến x trong `switch(x)`?",
    options: ["byte", "float", "Long", "Short", "long", "String"],
    correctAnswers: ["byte", "Short", "String"],
    explanation: "Switch hỗ trợ: byte, short, char, int (và wrapper của chúng), String (Java 7+), Enum. Không hỗ trợ long, float, double.",
    topic: "Switch Statement"
  },
  {
    id: 153,
    text: "Hai lựa chọn nào đúng về đóng gói và che giấu thông tin?",
    options: [
      "Chỉ định truy cập cho dữ liệu là private.",
      "Các phương thức cung cấp việc truy cập và chỉnh sửa dữ liệu.",
      "Dữ liệu thành viên có thể được thay đổi trực tiếp."
    ],
    correctAnswers: [
      "Chỉ định truy cập cho dữ liệu là private.",
      "Các phương thức cung cấp việc truy cập và chỉnh sửa dữ liệu."
    ],
    explanation: "Data private + Public Getter/Setter = Encapsulation.",
    topic: "Encapsulation"
  },
  {
    id: 154,
    text: "Khi tạo đối tượng lớp con, cái gì thực hiện trước tiên?",
    options: ["Phương thức khởi tạo lớp con", "Phương thức khởi tạo lớp cha"],
    correctAnswers: ["Phương thức khởi tạo lớp cha"],
    explanation: "Constructor lớp cha luôn được gọi trước (do lệnh ngầm định `super()` ở dòng đầu tiên của constructor con).",
    topic: "Object Creation Order"
  },
  {
    id: 155,
    text: "Cho lớp A có các method m1(protected), m2(package), m3(public), m4(private). Lớp Test (cùng package) gọi a.m1(), a.m2(), a.m3(), a.m4(). Lỗi ở đâu?",
    options: ["Lỗi biên dịch tại gọi m4"],
    correctAnswers: ["Lỗi biên dịch tại gọi m4"],
    explanation: "Cùng package truy cập được protected, default, public. Private (m4) không được.",
    topic: "Access Modifiers"
  },
  {
    id: 156,
    text: "Kỹ thuật nào được hỗ trợ trong OOP Java?",
    options: ["Đa hình", "Kết tập", "Đóng gói", "Đơn kế thừa", "Đa kế thừa"],
    correctAnswers: ["Đa hình", "Kết tập", "Đóng gói", "Đơn kế thừa"],
    explanation: "Java không hỗ trợ Đa kế thừa (Multiple Inheritance) với class.",
    topic: "OOP Concepts"
  },
  {
    id: 157,
    text: "Lựa chọn nào KHÔNG đúng về quan hệ giữa OToKhach (kế thừa OTo) và DongCo (thuộc tính của OTo)?",
    options: ["Mối quan hệ giữa OtoKhach và DongCo là quan hệ kế thừa."],
    correctAnswers: ["Mối quan hệ giữa OtoKhach và DongCo là quan hệ kế thừa."],
    explanation: "Quan hệ HAS-A (có một), không phải IS-A (là một).",
    topic: "Relationships"
  },
  {
    id: 158,
    text: "Chọn ba câu đúng về Constructor mặc định:",
    options: [
      "Phương thức khởi tạo mặc định gọi phương thức khởi tạo không tham số của lớp cha.",
      "Trình biên dịch chỉ tạo ra phương thức khởi tạo khi không có bất cứ một phương thức khởi tạo nào.",
      "Phương thức khởi tạo mặc định có chỉ định truy cập giống như lớp của nó.",
      "Phương thức khởi tạo mặc định khởi tạo các biến của phương thức."
    ],
    correctAnswers: [
      "Phương thức khởi tạo mặc định gọi phương thức khởi tạo không tham số của lớp cha.",
      "Trình biên dịch chỉ tạo ra phương thức khởi tạo khi không có bất cứ một phương thức khởi tạo nào.",
      "Phương thức khởi tạo mặc định có chỉ định truy cập giống như lớp của nó."
    ],
    explanation: "Constructor mặc định không khởi tạo biến cục bộ (biến của phương thức), nó chỉ khởi tạo thuộc tính instance (về null/0).",
    topic: "Default Constructor"
  },
  {
    id: 159,
    text: "Cho `Double x=new Double(10.0); Double y=new Double(10.0); Double z=x; int g=10; double h=10.0;`. Chọn kết quả đúng?",
    options: ["y==g", "g==h", "x==y", "y==z", "x==z", "g==10.0"],
    correctAnswers: ["y==g", "g==h", "x==z", "g==10.0"],
    explanation: "x==y (False, khác object). x==z (True, cùng ref). Unboxing giúp so sánh object với primitive (y==g).",
    topic: "Wrapper Classes"
  },
  {
    id: 160,
    text: "Sử dụng chỉ định truy cập nào cho phương thức để không bị ghi đè?",
    options: ["protected", "subclass", "final", "public"],
    correctAnswers: ["final"],
    explanation: "`final` method ngăn cản overriding.",
    topic: "Final Keyword"
  },
  {
    id: 161,
    text: "Chọn phương thức override hợp lệ cho `float getVar()` (lớp cha) trong lớp con?",
    options: [
      "public double getVar() { return x; }",
      "public float getVar(float f) { return f; }",
      "float getVar() { return x; }",
      "public float getVar() { return x; }",
      "private float getVar() { return x; }"
    ],
    correctAnswers: ["float getVar() { return x; }", "public float getVar() { return x; }"],
    explanation: "Override phải cùng kiểu trả về (hoặc covariant), access modifier không hẹp hơn (default -> default hoặc public).",
    topic: "Overriding Rules"
  },
  {
    id: 162,
    text: "Lựa chọn đúng về Đóng gói:",
    options: [
      "Đóng gói dữ liệu bảo vệ dữ liệu không bị thay đổi tùy tiện.",
      "Đóng gói dữ liệu cho phép thay đổi thiết kế bên trong mà giao diện bên ngoài không đổi.",
      "Đóng gói dữ liệu là một dạng của che giấu dữ liệu."
    ],
    correctAnswers: ["Tất cả các ý trên"],
    explanation: "Lợi ích cốt lõi của Encapsulation.",
    topic: "Encapsulation"
  },
  {
    id: 163,
    text: "Chỉ định nào KHÔNG thể dùng để khai báo phương thức?",
    options: ["abstract", "protected", "private", "const"],
    correctAnswers: ["const"],
    explanation: "`const` không được sử dụng trong Java.",
    topic: "Modifiers"
  },
  {
    id: 164,
    text: "Chọn phương thức overload cho Constructor `Animal(String, double)`?",
    options: [
      "public Object Animal(String color, double weight) {}",
      "private double Animal() {}",
      "protected Animal() {}",
      "Animal(double weight, String color) {}",
      "public void Animal(String color) {}"
    ],
    correctAnswers: ["protected Animal() {}", "Animal(double weight, String color) {}"],
    explanation: "Constructor overload phải cùng tên `Animal` và không có kiểu trả về.",
    topic: "Overloading Constructors"
  },
  {
    id: 165,
    text: "Khi nào trình biên dịch cung cấp constructor mặc định cho lớp A?",
    options: [
      "class A {}",
      "class A { public A(int x) {} }",
      "class A extends Z { void A() {} }",
      "class A { public A() {} }"
    ],
    correctAnswers: ["class A {}", "class A extends Z { void A() {} }"],
    explanation: "Nếu lớp chưa có bất kỳ constructor nào, compiler sẽ tạo default. `void A()` là phương thức thường, không phải constructor, nên compiler vẫn tạo default constructor trong trường hợp đó.",
    topic: "Default Constructor"
  },
  {
    id: 166,
    text: "Chồng phương thức (Overloading) giúp:",
    options: ["Đơn giản hóa các đối tượng phức tạp để ta hiểu chúng hơn"],
    correctAnswers: ["Đơn giản hóa các đối tượng phức tạp để ta hiểu chúng hơn"],
    explanation: "Tăng tính đọc hiểu của code.",
    topic: "Overloading"
  },
  {
    id: 167,
    text: "Cho `TestSuper` có constructor tham số `TestSuper(int i)`. `TestSub extends TestSuper` không có constructor. Kết quả?",
    code: `class TestSuper { TestSuper(int i){} }
class TestSub extends TestSuper {}
// main: new TestSub();`,
    options: ["Lỗi biên dịch"],
    correctAnswers: ["Lỗi biên dịch"],
    explanation: "Lớp `TestSub` được sinh default constructor gọi `super()`. Nhưng `TestSuper` không có no-arg constructor (do đã định nghĩa constructor có tham số), nên gây lỗi.",
    topic: "Constructor Chaining"
  },
  {
    id: 168,
    text: "Nếu lớp cha A có constructor tham số, lớp con phải làm gì?",
    options: ["Bất kỳ phương thức khởi tạo nào của lớp con đều phải gọi constructor của lớp cha trong câu lệnh đầu tiên"],
    correctAnswers: ["Bất kỳ phương thức khởi tạo nào của lớp con đều phải gọi constructor của lớp cha trong câu lệnh đầu tiên"],
    explanation: "Bắt buộc phải gọi `super(...)` tường minh nếu cha không có default constructor.",
    topic: "Constructor Chaining"
  },
  {
    id: 169,
    text: "Loại dữ liệu nào dùng được cho switch?",
    options: ["Long", "char", "byte", "String", "int", "double"],
    correctAnswers: ["char", "byte", "String", "int"],
    explanation: "Switch không hỗ trợ Long, float, double.",
    topic: "Switch Statement"
  },
  {
    id: 170,
    text: "Phát biểu đúng về đóng gói?",
    options: ["Chỉ định truy cập cho dữ liệu là private.", "Các phương thức cung cấp việc truy cập và chỉnh sửa dữ liệu."],
    correctAnswers: ["Chỉ định truy cập cho dữ liệu là private.", "Các phương thức cung cấp việc truy cập và chỉnh sửa dữ liệu."],
    explanation: "Private fields + Public methods.",
    topic: "Encapsulation"
  },
  {
    id: 171,
    text: "Loại nào được dùng để truyền tham số theo tham trị (Primitive)?",
    options: ["int", "Float", "mảng", "Các kiểu dữ liệu nguyên thủy", "StringBuffer", "Double"],
    correctAnswers: ["int", "Các kiểu dữ liệu nguyên thủy"],
    explanation: "Java truyền tham trị. Các kiểu nguyên thủy chứa giá trị thực sự. Các kiểu Wrapper (Float, Double) hay Object (Mảng, StringBuffer) chứa tham chiếu (reference value).",
    topic: "Parameter Passing"
  },
  {
    id: 172,
    text: "Tại sao Java có thể 'viết một lần chạy mọi nơi' (WORA)?",
    options: [
      "Vì Java hỗ trợ cả biên dịch lẫn thông dịch. Cơ chế thông dịch do JVM thực hiện giúp tạo ra mã máy của từng nền tảng khác nhau.",
      "Sau khi biên dịch thu được byte code. Các byte code này được hiểu trên mọi nền tảng (có JVM)."
    ],
    correctAnswers: [
      "Vì Java hỗ trợ cả biên dịch lẫn thông dịch. Cơ chế thông dịch do JVM thực hiện giúp tạo ra mã máy của từng nền tảng khác nhau.",
      "Sau khi biên dịch thu được byte code. Các byte code này được hiểu trên mọi nền tảng (có JVM)."
    ],
    explanation: "Bytecode + JVM là chìa khóa của tính năng WORA.",
    topic: "Java Platform"
  }
];

const Exam3 = () => {
  const [status, setStatus] = useState('start');
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    let timer;
    if (status === 'quiz' && timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, option) => {
    if (isSubmitted) return;
    setAnswers(prev => {
      const currentSelected = prev[questionId] || [];
      if (currentSelected.includes(option)) {
        return { ...prev, [questionId]: currentSelected.filter(item => item !== option) };
      } else {
        return { ...prev, [questionId]: [...currentSelected, option] };
      }
    });
  };

  const toggleMarkQuestion = (id) => {
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setStatus('result');
    setShowSubmitConfirm(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach(q => {
      const userAns = answers[q.id] || [];
      const correctAns = q.correctAnswers;
      const isCorrect = userAns.length === correctAns.length && userAns.every(val => correctAns.includes(val));
      if (isCorrect) score++;
    });
    return score;
  };

  const renderStartScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-slate-200">
        <div className="mb-8 flex justify-center">
            <div className="bg-violet-100 p-5 rounded-2xl rotate-3 transform transition-transform hover:rotate-6">
                <BrainCircuit size={56} className="text-violet-600" />
            </div>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">OOP EXAM #03</h1>
        <p className="text-slate-500 mb-8 text-lg">Hardcore Mix & Theory</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                <Clock className="w-6 h-6 text-violet-500 mb-2" />
                <span className="font-bold text-slate-700">60 Phút</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                <LayoutGrid className="w-6 h-6 text-pink-500 mb-2" />
                <span className="font-bold text-slate-700">40 Câu</span>
            </div>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8 text-left rounded-r-lg">
            <p className="font-bold text-orange-800 flex items-center gap-2 mb-1"><Zap size={18}/> Cảnh báo:</p>
            <p className="text-sm text-orange-700">Đề này trộn lẫn Code và Lý thuyết (UML, Threads, Memory). Đừng chủ quan!</p>
        </div>

        <button 
          onClick={() => setStatus('quiz')}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl text-lg transition-all shadow-xl shadow-violet-200 flex items-center justify-center gap-2 transform active:scale-95"
        >
          Chiến luôn <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );

  const renderQuizScreen = () => {
    const q = QUESTIONS[currentQIndex];
    const userSelected = answers[q.id] || [];

    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="font-black text-lg text-slate-800 tracking-tight">ĐỀ SỐ 3</span>
                    <span className="text-xs text-slate-400 font-bold uppercase">IT1 - Bách Khoa HN</span>
                </div>
                <div className="h-8 w-px bg-slate-200 mx-2"></div>
                <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg text-sm font-bold border border-violet-200">
                    Câu {currentQIndex + 1}/{QUESTIONS.length}
                </span>
             </div>
             <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                <Clock size={20} className={timeLeft < 300 ? 'text-red-500' : 'text-slate-400'} /> {formatTime(timeLeft)}
             </div>
             <button 
                onClick={() => setShowSubmitConfirm(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-slate-200"
             >
                Nộp bài
             </button>
          </div>
          <div className="w-full bg-slate-200 h-1.5">
            <div className="bg-violet-600 h-1.5 transition-all duration-500 ease-out" style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}></div>
          </div>
        </header>

        <main className="flex-1 max-w-6xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-9 space-y-6">
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-6">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                            <Coffee size={12} /> {q.topic}
                        </span>
                        <button 
                            onClick={() => toggleMarkQuestion(q.id)}
                            className={`flex items-center gap-2 text-sm font-bold transition-colors px-3 py-1.5 rounded-lg ${markedQuestions.has(q.id) ? 'bg-yellow-50 text-yellow-600' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            <Flag size={16} fill={markedQuestions.has(q.id) ? "currentColor" : "none"}/>
                            {markedQuestions.has(q.id) ? 'Đã ghim' : 'Ghim câu này'}
                        </button>
                    </div>

                    <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-6 leading-relaxed">{q.text}</h2>

                    {q.code && (
                        <div className="bg-slate-900 rounded-xl p-5 mb-8 overflow-x-auto shadow-inner border border-slate-800 relative group">
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Terminal size={16} className="text-slate-500" />
                            </div>
                            <pre className="font-mono text-sm lg:text-base text-violet-300 leading-relaxed">
                                <code>{q.code}</code>
                            </pre>
                        </div>
                    )}

                    <div className="space-y-3">
                        {q.options.map((opt, idx) => {
                            const isSelected = userSelected.includes(opt);
                            return (
                                <div 
                                    key={idx}
                                    onClick={() => handleAnswer(q.id, opt)}
                                    className={`
                                        relative flex items-center p-4 lg:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group
                                        ${isSelected ? 'border-violet-600 bg-violet-50/50 shadow-md' : 'border-slate-100 hover:border-violet-200 hover:bg-white'}
                                    `}
                                >
                                    <div className={`
                                        mr-4 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors flex-shrink-0
                                        ${isSelected ? 'bg-violet-600 border-violet-600' : 'bg-white border-slate-200 group-hover:border-violet-300'}
                                    `}>
                                        {isSelected && <CheckSquare size={16} className="text-white" />}
                                    </div>
                                    <span className={`text-base lg:text-lg ${isSelected ? 'text-violet-900 font-bold' : 'text-slate-600 font-medium'}`}>
                                        {opt}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <button 
                        onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                        disabled={currentQIndex === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm"
                    >
                        <ChevronLeft size={20} /> Quay lại
                    </button>
                    <button 
                        onClick={() => setCurrentQIndex(Math.min(QUESTIONS.length - 1, currentQIndex + 1))}
                        disabled={currentQIndex === QUESTIONS.length - 1}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 shadow-lg shadow-violet-200 transition-all transform active:scale-95"
                    >
                        Tiếp theo <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="hidden lg:block lg:col-span-3">
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 sticky top-24">
                    <div className="flex items-center gap-2 mb-5 text-slate-800 font-bold border-b border-slate-100 pb-3">
                        <LayoutGrid size={18} className="text-slate-400" /> Tổng quan
                    </div>
                    <div className="grid grid-cols-5 gap-2.5">
                        {QUESTIONS.map((q, idx) => {
                            const isAnswered = answers[q.id] && answers[q.id].length > 0;
                            const isCurrent = currentQIndex === idx;
                            const isMarked = markedQuestions.has(q.id);

                            return (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQIndex(idx)}
                                    className={`
                                        h-10 rounded-xl text-xs font-bold transition-all relative
                                        ${isCurrent ? 'ring-2 ring-violet-500 ring-offset-2 z-10 scale-105' : ''}
                                        ${isMarked 
                                            ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' 
                                            : isAnswered 
                                                ? 'bg-violet-100 text-violet-700 border border-violet-200' 
                                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                        }
                                    `}
                                >
                                    {idx + 1}
                                    {isMarked && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-white"></div>}
                                </button>
                            );
                        })}
                    </div>
                    
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                            <div className="w-3 h-3 bg-violet-100 border border-violet-200 rounded"></div> Đã chọn
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                            <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div> Đã ghim
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                            <div className="w-3 h-3 bg-slate-50 border border-slate-200 rounded"></div> Chưa làm
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {showSubmitConfirm && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform scale-100 transition-all">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Chốt đơn?</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">Đã kiểm tra kỹ chưa đồng chí? Nộp rồi là không sửa được đâu đấy.</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={handleSubmit} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-2xl transition-colors">Nộp luôn cho nóng</button>
                        <button onClick={() => setShowSubmitConfirm(false)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl transition-colors">Để tôi check lại</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    );
  };

  const renderResultScreen = () => {
    const score = calculateScore();
    const percentage = Math.round((score / QUESTIONS.length) * 100);

    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500"></div>
                <h2 className="text-3xl font-black text-slate-800 mb-8">Tổng Kết</h2>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10">
                    <div className="text-center relative">
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                                strokeDasharray={2 * Math.PI * 70}
                                strokeDashoffset={2 * Math.PI * 70 * (1 - percentage / 100)}
                                className={percentage >= 50 ? 'text-violet-500' : 'text-red-500'}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <span className="text-4xl font-black text-slate-900">{score}</span>
                             <span className="text-sm font-bold text-slate-400">/{QUESTIONS.length}</span>
                        </div>
                    </div>
                    
                    <div className="text-left space-y-2">
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wide">Nhận xét:</div>
                        <p className={`text-2xl font-bold ${percentage >= 80 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {percentage >= 80 ? "Pro Player! A+ trong tầm tay." : 
                             percentage >= 50 ? "Tạm ổn. Cẩn thận mấy câu bẫy." : 
                             "Hỏng rồi. Học lại slide gấp!"}
                        </p>
                        <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
                            {percentage < 50 && "Đừng nản, xem lại đáp án bên dưới rồi cày lại slide IT3100 nhé."}
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl"
                >
                    <RotateCcw size={18} /> Làm lại đề này
                </button>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 px-2 flex items-center gap-2"><BookOpen size={20}/> Chi tiết đáp án</h3>
                {QUESTIONS.map((q, idx) => {
                    const userAns = answers[q.id] || [];
                    const correctAns = q.correctAnswers;
                    const isCorrect = userAns.length === correctAns.length && userAns.every(v => correctAns.includes(v));

                    return (
                        <div key={q.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                            <div className={`p-4 border-b flex justify-between items-center ${isCorrect ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'}`}>
                                <div className="flex items-center gap-3">
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {idx + 1}
                                    </span>
                                    <span className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                        {isCorrect ? 'Chính xác' : 'Sai rồi'}
                                    </span>
                                </div>
                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">{q.topic}</span>
                            </div>
                            
                            <div className="p-6 lg:p-8">
                                <h4 className="font-bold text-slate-900 text-lg mb-4">{q.text}</h4>
                                {q.code && (
                                    <div className="bg-slate-900 p-4 rounded-xl mb-6 text-sm font-mono text-violet-200 overflow-x-auto border border-slate-800 shadow-inner">
                                        {q.code}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-3">Bạn chọn:</p>
                                        {userAns.length ? userAns.map((a, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-medium text-slate-700 mb-2 last:mb-0">
                                                {correctAns.includes(a) 
                                                    ? <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5"/> 
                                                    : <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5"/>}
                                                <span className="leading-snug">{a}</span>
                                            </div>
                                        )) : <span className="text-sm italic text-slate-400">Không chọn gì cả</span>}
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <p className="text-xs font-bold text-green-600 uppercase mb-3">Đáp án đúng:</p>
                                        {correctAns.map((a, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-green-800 mb-2 last:mb-0">
                                                <CheckCircle size={18} className="shrink-0 mt-0.5"/> 
                                                <span className="leading-snug">{a}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-50/50 p-5 rounded-xl text-sm text-blue-900 border border-blue-100 leading-relaxed">
                                    <strong className="block mb-1 text-blue-700 flex items-center gap-2"><BrainCircuit size={16}/> Giải thích:</strong>
                                    {q.explanation}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {status === 'start' && renderStartScreen()}
      {status === 'quiz' && renderQuizScreen()}
      {status === 'result' && renderResultScreen()}
    </div>
  );
};

export default Exam3;