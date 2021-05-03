using System;

namespace MultidimensionalArray
{
    class Program
    {
        int[,] arr = new int[11, 11];
        int PS = 0;
        int LS = 0;
        int Col = 0;
        int Row = 0;
        int rowNo;
        int colNo;
        int rowValue;
        int colValue;
        static int opnum = 0;
        int valnum = 0;
        int posnum = 0;
        int rotNo;
        string type = null;
        int insertedValues = 0;

        static bool ArrayExist = false;
        static bool ArrayNotExist = true;
        static bool IsValuesInserted = false;

        static void Main(string[] args)
        {
            Program program = new Program();
            Console.WriteLine("------------------------------------------" +
                              "\n    Final Year Project   -  2D-Array    " +
                              "\n------------------------------------------");
            Console.WriteLine("CREATED BY SYED MUHAMMAD OWAIS");
        Again:
            Console.Write("\nSelect Option..." +
                "\n1.  Create" +
                "\n2.  Insert" +
                "\n3.  Delete" +
                "\n4.  Update" +
                "\n5.  Statistics" +
                "\nSpecial funtions..." +
                "\n6.  Transpose" +
                "\n7.  Rotate right" +
                "\n8. Rotate left" +
                "\n\nPlease enter your choice number = ");
            opnum = int.Parse(Console.ReadLine());
            switch (opnum)
            {
                case 1:
                    program.Full();
                    if (ArrayExist == false)
                    {
                        program.Create();
                    }
                    else
                    {
                        Console.WriteLine("Array is already created.");
                    }
                    break;
                case 2:
                    program.Empty();
                    if (ArrayNotExist == false)
                    {
                        program.Insert();
                    }
                    else
                    {
                        Console.WriteLine("Sorry array is not created.");
                    }
                    break;
                case 3:
                    program.Empty();
                    if (ArrayNotExist == false)
                    {
                        program.Delete();
                    }
                    else
                    {
                        Console.WriteLine("Sorry array is not created.");
                    }
                    break;
                case 44:
                    program.Empty();
                    if (ArrayNotExist == false)
                    {
                        program.Append();
                    }
                    else
                    {
                        Console.WriteLine("Sorry array is not created.");
                    }
                    break;
                case 4:
                    program.Empty();
                    if (ArrayNotExist == false)
                    {
                        program.Update();
                    }
                    else
                    {
                        Console.WriteLine("Sorry array is not created.");
                    }
                    break;
                case 5:
                    program.Output();
                    break;
                case 77:
                    program.Empty();
                    if (ArrayNotExist == false)
                    {
                        program.Inverse();
                    }
                    else
                    {
                        Console.WriteLine("Sorry array is not created.");
                    }
                    break;
                case 6:
                    program.Empty();
                    if (ArrayNotExist == false)
                    {
                        Console.WriteLine("Original matrix....");
                        program.printarray(program.arr);
                        Console.WriteLine("Transpose:");
                        program.Transpose();
                    }
                    else
                    {
                        Console.WriteLine("Sorry array is not created.");
                    }
                    break;
                case 7:
                    program.Empty();
                    if (ArrayNotExist == false)
                    {
                        Console.Write("Please enter no. of rotation(s) = ");
                        int rotNo = int.Parse(Console.ReadLine());
                        Console.Write("\nOriginal martix\n");
                        program.printarray(program.arr);
                        program.RotateRight(rotNo);
                    }
                    else
                    {
                        Console.WriteLine("Sorry array is not created.");
                    }
                    break;
                case 8:
                    program.Empty();
                    if (ArrayNotExist == false)
                    {
                        Console.Write("Please enter no. of rotation(s) = ");
                        int rotNo = int.Parse(Console.ReadLine());
                        Console.Write("\nOriginal martix\n");
                        program.printarray(program.arr);
                        program.RotateLeft(rotNo);
                    }
                    else
                    {
                        Console.WriteLine("Sorry array is not created.");
                    }
                    break;
            }
            Console.Write("\nDo you want go back to menu? Please enter (y/n) = ");
        ChooseRightKey:
            string s = Console.ReadLine();
            if (s == "y" | s == "Y")
            {
                goto Again;
            }
            if (s == "n" | s == "N")
            {
                goto Exit;
            }
            if (s != "y" | s != "Y")
            {
                goto ChooseRightKey;
            }
        Exit:;
        }
        private void Create()
        {
            Console.Write("\nMaximum size is = 10 by 10 Matrix");
        AgainPS:
            Console.Write("\nEnter physical size= ");
            PS = int.Parse(Console.ReadLine());
            if (PS > 10)
            {
                Console.WriteLine("Out of bounds...exceeding maximum size" +
                    "\nPlease enter correct size again. ");
                goto AgainPS;
            }
        AgainLS:
            Console.Write("Enter logical size= ");
            LS = int.Parse(Console.ReadLine());
            if (LS > PS)
            {
                Console.WriteLine("Out of bounds...exceeding physical size" +
                    "\nPlease enter correct size again. ");
                goto AgainLS;
            }
        AgainCol:
            Console.Write("Enter no. of column(s)= ");
            Col = int.Parse(Console.ReadLine());
            if (Col > LS)
            {
                Console.WriteLine("Out of bounds...exceeding logical size" +
                     "\nPlease enter correct size again. ");
                goto AgainCol;
            }
        AgainRow:
            Console.Write("Enter no. of row(s)= ");
            Row = int.Parse(Console.ReadLine());
            if (Row > LS)
            {
                Console.WriteLine("Out of bounds...exceeding logical size" +
                     "\nPlease enter correct size again. ");
                goto AgainRow;
            }
            Console.Write("2D-Array is sucessfully created...");
            ArrayExist = true;
            ArrayNotExist = false;
        }
        private void Insert()
        {
            if (IsValuesInserted == false)
            {
                Console.Write("\nSelect option..." +
                                "\n1. Insert column wise" +
                                "\n2. Insert row wise" +
                                "\nPlease enter option number = ");
                opnum = int.Parse(Console.ReadLine());
                switch (opnum)
                {
                    case 1:
                        ColumnWise();
                        break;
                    case 2:
                        RowWise();
                        break;
                }
            }
            else
            {
                Console.WriteLine("Values are already inserted in an array");
            }

        }
        private void Delete()
        {
            if (IsValuesInserted == true)
            {
                Console.Write("\nSelect option..." +
                            "\n1. Delete row" +
                            "\n2. Delete column" +
                            "\nEnter option number = ");
                opnum = int.Parse(Console.ReadLine());
                if (opnum == 1)
                {
                    DeleteRow();
                }
                if (opnum == 2)
                {
                    DeleteColumn();
                }
            }
            else
            {
                Console.WriteLine("Please insert values in an array");
            }

        }
        private void Append()
        {
            Console.Write("\nSelect option..." +
               "\n1. At begin of column" +
               "\n2. At begin of row" +
               "\n3. At end of column" +
               "\n4. At end of row" +
               "\n5. At specific column" +
               "\n6. At specific row" +
               "\n\nEnter option number = ");
            opnum = int.Parse(Console.ReadLine());
            if (opnum == 1)
            {
                AtBeginofCol();
            }
            if (opnum == 2)
            {
                AtBeginofRow();
            }
            if (opnum == 3)
            {
                AtEndofCol();
            }
            if (opnum == 4)
            {
                AtEndofRow();
            }
            if (opnum == 5)
            {
                AtSpecCol();
            }
            if (opnum == 6)
            {
                AtSpecRow();
            }
            printarray(arr);
        }
        private void Update()
        {
            if (IsValuesInserted == true)
            {
            DoAgainCol:
                Console.Write("\nPlease enter column no. = ");
                colNo = int.Parse(Console.ReadLine());
                if (colNo > Col & colNo <= 0)
                {
                    Console.WriteLine("Out of bounds..." +
                        "\nPlease enter correct number.");
                    goto DoAgainCol;
                }
            DoAgainRow:
                Console.Write("\nPlease enter row no. = ");
                rowNo = int.Parse(Console.ReadLine());
                if (rowNo > Row & rowNo <= 0)
                {
                    Console.WriteLine("Out of bounds..." +
                        "\nPlease enter correct number.");
                    goto DoAgainRow;
                }
                Console.Write("\nPlease enter new value = ");
                valnum = int.Parse(Console.ReadLine());
                arr[rowNo, colNo] = valnum;
                Console.WriteLine("\nSuccessfully updated....");
                printarray(arr);
            }
            else
            {
                Console.WriteLine("Please insert values in an array");
            }

        }
        private void Output()
        {
            Console.WriteLine("\nStatus....");
            Console.WriteLine("Data type: INTEGER");
            Console.WriteLine("Physical size is = {0}", PS);
            Console.WriteLine("Logical size is = {0}", LS);
            Console.WriteLine("No. of column(s) = {0}", Col);
            Console.WriteLine("No. of row(s) = {0}", Row);
            Console.WriteLine("Total No. of values: {0}", insertedValues);
            Console.WriteLine("Array empty = {0}", ArrayNotExist);
            Console.WriteLine("Array full = {0}", ArrayExist);
            Console.WriteLine("Array type = {0}", type);
            if (insertedValues != 0)
            {
                Console.Write("Values:\n");
                printarray(arr);
            }
            else Console.Write("Values: null");
        }
        private void Inverse()
        {

        }
        private void Transpose()
        {
            if (IsValuesInserted == true)
            {
                for (int ii = 1; ii <= Col; ii++)
                {
                    for (int jj = 1; jj <= Row; jj++)
                    {
                        Console.Write("{0,4} ", +arr[jj, ii]);
                    }
                    Console.Write("\n");
                }
            }
            else
            {
                Console.WriteLine("Please insert values in an array");
            }
        }
        private void RotateRight(int x)
        {
            if (IsValuesInserted == true)
            {
                int[,] arrTemp = new int[11, 11];
                for (int i = 1; i <= Row; i++)
                {
                    for (int j = 1; j <= Col; j++)
                    {
                        arrTemp[i, j] = arr[i, j];
                    }
                }
                int[,] arrRotRight = new int[11, 11];
                int r = 1;
                int c = 1;
                for (int h = 1; h <= x; h++)
                {
                    r = 1;
                    for (int ii = 1; ii <= Col; ii++)
                    {
                        c = 1;
                        for (int jj = Row; jj >= 1; jj--)
                        {
                            arrRotRight[r, c] = arrTemp[jj, ii];
                            c += 1;
                        }
                        r += 1;
                    }
                    for (int i = 1; i <= Row; i++)
                    {
                        for (int j = 1; j <= Col; j++)
                        {
                            arrTemp[i, j] = arrRotRight[i, j];
                        }
                    }
                }
                Console.WriteLine("Rotate right {0} time(s)", x);
                printarray(arrTemp);
            }
            else
            {
                Console.WriteLine("Please insert values in an array");
            }

        }
        private void RotateLeft(int x)
        {
            if (IsValuesInserted == true)
            {
                int[,] arrTemp = new int[11, 11];
                for (int i = 1; i <= Row; i++)
                {
                    for (int j = 1; j <= Col; j++)
                    {
                        arrTemp[i, j] = arr[i, j];
                    }
                }
                int[,] arrRotLeft = new int[11, 11];
                int r = 1;
                int c = 1;
                for (int h = 1; h <= x; h++)
                {
                    r = 1;
                    for (int ii = Col; ii >= 1; ii--)
                    {
                        c = 1;
                        for (int jj = 1; jj <= Row; jj++)
                        {
                            arrRotLeft[r, c] = arrTemp[jj, ii];
                            c += 1;
                        }
                        r += 1;
                    }
                    for (int i = 1; i <= Row; i++)
                    {
                        for (int j = 1; j <= Col; j++)
                        {
                            arrTemp[i, j] = arrRotLeft[i, j];
                        }
                    }
                }
                Console.WriteLine("Rotate left {0} time(s)", x);
                printarray(arrTemp);
            }
            else
            {
                Console.WriteLine("Please insert values in an array");
            }

        }
        private void AtBeginofCol()
        {

        }
        private void AtBeginofRow()
        {

        }
        private void AtEndofCol()
        {

        }
        private void AtEndofRow()
        {

        }
        private void AtSpecCol()
        {

        }
        private void AtSpecRow()
        {

        }
        private void DeleteRow()
        {
            if (IsValuesInserted == true)
            {
            AgainDelRow:
                Console.Write("Enter row no. = ");
                rowNo = int.Parse(Console.ReadLine());
                if (rowNo > Row & rowNo < 1)
                {
                    Console.WriteLine("\nOut of bounds...." +
                        "/nPlease enter corrent number.");
                    goto AgainDelRow;
                }
                ShiftUp(rowNo);
                Console.WriteLine("Successfully deleted...");
                printarray(arr);
            }
            else
            {
                Console.WriteLine("Please insert values in an array");
            }

        }
        private void DeleteColumn()
        {
            if (IsValuesInserted == true)
            {
            AgainDelCol:
                Console.Write("Enter column no. = ");
                colNo = int.Parse(Console.ReadLine());
                if (colNo > Col & colNo < 1)
                {
                    Console.WriteLine("\nOut of bounds...." +
                        "/nPlease enter corrent number.");
                    goto AgainDelCol;
                }
                ShiftLeft(colNo);
                Console.WriteLine("Successfully deleted...");
                printarray(arr);
            }
            else
            {
                Console.WriteLine("Please insert values in an array");
            }
        }
        private void ColumnWise()
        {
            if (IsValuesInserted == false)
            {
                Console.WriteLine("\nEnter values...");
                for (int c = 1; c <= Col; c++)
                {
                    Console.WriteLine("This is column number {0}: ", c);
                    for (int r = 1; r <= Row; r++)
                    {
                        Console.Write("Value# {0} = ", r);
                        colValue = int.Parse(Console.ReadLine());
                        arr[r, c] = colValue;
                        insertedValues++;
                    }
                }
                IsValuesInserted = true;
                Console.WriteLine("Range completed......successfully inserted");
                Console.WriteLine("Array values.....\n");
                printarray(arr);
            }
            else
            {
                Console.WriteLine("Array values are already inserted....");
                Console.WriteLine("Please use append function or launch program again....");
            }
        }
        private void RowWise()
        {
            if (IsValuesInserted == false)
            {
                Console.WriteLine("\nEnter values...");
                for (int c = 1; c <= Row; c++)
                {
                    Console.WriteLine("This is row number {0}: ", c);
                    for (int r = 1; r <= Col; r++)
                    {
                        Console.Write("Value# {0} = ", r);
                        rowValue = int.Parse(Console.ReadLine());
                        arr[c, r] = rowValue;
                        insertedValues++;
                    }
                }
                IsValuesInserted = true;
                Console.WriteLine("Range completed......successfully inserted");
                Console.WriteLine("Array values.....\n");
                printarray(arr);
            }
            else
            {
                Console.WriteLine("Array values are already inserted....");
                Console.WriteLine("Please use append function or launch program again....");
            }

        }
        private void ShiftLeft(int x)
        {
            for (int k = 1; k <= Row; k++)
            {
                for (int u = x; u <= Col; u++)
                {
                    arr[k, x] = arr[k, x + 1];
                    insertedValues--;
                }
            }
            Col--;
        }
        private void ShiftUp(int x)
        {
            for (int k = 1; k <= Col; k++)
            {
                for (int u = x; u <= Row; u++)
                {
                    arr[u, k] = arr[u + 1, k];
                    insertedValues--;
                }
            }
            Row--;
        }
        private bool Full()
        {
            return (ArrayExist);
        }
        private bool Empty()
        {
            return (ArrayNotExist);
        }
        private void printarray(int[,] array)
        {
            for (int i = 1; i <= Row; i++)
            {
                for (int j = 1; j <= Col; j++)
                {
                    Console.Write("{0,4}", array[i, j]);
                }
                Console.Write("\n");
            }
        }
    }
}
