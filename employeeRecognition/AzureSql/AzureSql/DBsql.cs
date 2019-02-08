using System;
using System.Data.SqlClient;   // System.Data.dll
//using System.Data;           // For:  SqlDbType , ParameterDirection

namespace csharp_db_test
{
    class Program
    {
        /***********************************
         MAIN
        ************************************/

        /****** START OF MAIN *******/
        static void Main(string[] args)
        {
            try
            {
                var cb = new SqlConnectionStringBuilder();
                cb.DataSource = "erraisqlserver.database.windows.net";
                cb.UserID = "erraiadmin";
                cb.Password = "DBaccess3";
                cb.InitialCatalog = "EmployeeDB";

                using (var connection = new SqlConnection(cb.ConnectionString))
                {
                    connection.Open();

                    Submit_Tsql_NonQuery(connection, "2 - Create-Tables", Build_2_Tsql_CreateTables());

                    Submit_Tsql_NonQuery(connection, "3 - Inserts", Build_3_Tsql_Inserts());

                    Submit_Tsql_NonQuery(connection, "4 - Update", Build_4_Tsql_Update());

                    //Submit_Tsql_NonQuery(connection, "5 - Delete-Join", Build_5_Tsql_DeleteJoin());

                    Submit_6_Tsql_ViewAwards(connection);
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }


            Console.WriteLine("=================================");
            Console.WriteLine("Testing Output Portion");
            Console.WriteLine("=================================");

            Console.WriteLine("View the report output here, then press any key to end the program...");
            Console.ReadKey();
        }

        /****** END OF MAIN *******/

        // For SQL Syntax CheatSheet: https://tableplus.io/blog/2018/08/ms-sql-server-data-types-cheatsheet.html


        /***********************************
         SQL CREATE TABLES FUNCTION 
        ************************************/
        static string Build_2_Tsql_CreateTables()
        {
            return @"

        -- Clean the DB:
        DROP TABLE IF EXISTS [user];
        DROP TABLE IF EXISTS tabDepartment;
        DROP TABLE IF EXISTS userAccount;

        -- Here, we create our actual EmployeeDB tables:

        DROP TABLE IF EXISTS award;
        DROP TABLE IF EXISTS role;
        DROP TABLE IF EXISTS permission;
        DROP TABLE IF EXISTS userAcct;

        CREATE TABLE userAcct
        (
            id          int IDENTITY(1,1)  not null  PRIMARY KEY,    -- IDENTIY(1,1) is SQL for auto_increment
            first_name  varchar(128)       not null,
            last_name   varchar(128)       not null,
            password    varchar(128)       not null,
            email       varchar(128)       not null,
            create_on   datetime2           default CURRENT_TIMESTAMP,          
            signature   image
        
        );

        CREATE TABLE permission
        (
            id          int IDENTITY(0,1) not null  PRIMARY KEY,      -- Only two entries in permission: user (0) or admin (1)
            addUser     bit not null,                                 -- Can be 0, 1, or null       
            editUser    bit not null,                                   
            deleteUser  bit not null                                    
        )

        CREATE TABLE role
        (
            id              int IDENTITY(1,1)   not null    PRIMARY KEY,                -- IDENTIY(1,1) is SQL for auto_increment
            user_id         int                 not null    REFERENCES userAcct (id),   -- A foreign key to userAcct.id
            permission_id   int                 not null    REFERENCES permission (id), -- A foreign key to permission.id
            type            varchar(128)             null                                    -- NEEDS SIZE (128)
        )


        CREATE TABLE award 
        (
            id          int IDENTITY(1,1)   not null    PRIMARY KEY,            -- IDENTIY(1,1) is SQL for auto_increment                
            sender_user_id       int        not null    REFERENCES userAcct (id),   -- A foreign key to role.id (the sender)
            recipient_user_id   int         not null    REFERENCES userAcct (id),  -- A foreign key to userAcct.id (the recipient)
            type        varchar(128)            null,                               -- NEEDS SIZE (128).
            time        time                null,   -- fixed
            date        date                null    -- fixed
        )
    ";
        }


        /***********************************
         SQL INSERT FUNCTION
        ************************************/
        static string Build_3_Tsql_Inserts()
        {
            return @"

            INSERT INTO userAcct(first_name, last_name, password, email, signature)
            VALUES
            ('Vinh', 'Dong', 'psw0', 'dongv@oregonstate.edu', null),
            ('Geneva', 'Lai', 'psw1', 'laig@oregonstate.edu',null ),
            ('Matt', 'Castillo', 'psw2', 'castimat@oregonstate.edu', null); 

            INSERT INTO permission (addUser, editUser, deleteUser)
            VALUES
            ('0', '1', '0'),    -- user: permission.id = 0
            ('1', '1', '1')     -- admin: permission.id = 1

            INSERT INTO role (user_id, permission_id, type) 
            VALUES 
            ('1', '1', 'admin'),    -- Vinh
            ('2', '0', 'user'),     -- Geneva
            ('3', '0', 'user')      -- Matt

            INSERT into award (sender_user_id, recipient_user_id, type, time, date)
            VALUES
            ('1', '3', 'service', '12:00:00.0000000', '2019-01-27'),         -- From 1 (Vinh), to 3 (Matt)
            ('2', '1', 'performance', '01:30:00.0000000', '2019-01-28'),     -- From 2 (Geneva), to 1 (Vinh)
            ('3', '2', 'team worker', '02:45:00.0000000', '2019-01-29')      -- From 3 (Matt), to 2 (Geneva)



    ";
        }

        /***********************************
          SQL UPDATE FUNCTION
        ************************************/
        // If conditions in MS SQL: https://docs.microsoft.com/en-us/sql/t-sql/language-elements/if-else-transact-sql?view=sql-server-2017
        static string Build_4_Tsql_Update()
        {
            return @"

        -- User can change their name
        UPDATE userAcct
        SET
            userAcct.first_name = 'Geneva01'
        WHERE
            userAcct.id = 2;


        
        


        -- Admin can edit any account

    ";
        }

        /***********************************
          SQL DELETE FUNCTION
        ************************************/
        static string Build_5_Tsql_DeleteJoin()
        {
            return @"
        -- DECLARE @DName2  nvarchar(128);
        -- SET @DName2 = @csharpParmDepartmentName;  --'Legal';

        -- Right size the Legal department.
        -- DELETE empl
        -- FROM
        --     tabEmployee   as empl
        -- INNER JOIN
        --     tabDepartment as dept ON dept.DepartmentCode = empl.DepartmentCode
        -- WHERE
        --     dept.DepartmentName = @DName2

        -- Disband the Legal department.
        -- DELETE tabDepartment
        --     WHERE DepartmentName = @DName2;



        -- User can delete, from the system, awards that this user has previously given

        -- Admin can delete an account entirely


    ";
        }



        /***********************************
          SQL SELECT FUNCTION
        ************************************/
        static string Build_6_Tsql_ViewAwards()
        {
               return @"

        -- View all the awards created (to and from whom)
        SELECT * FROM award;
    ";
        }

        static void Submit_6_Tsql_ViewAwards(SqlConnection connection)
        {
            Console.WriteLine();
            Console.WriteLine("=================================");
            Console.WriteLine("Now, view all awards created.");
            Console.WriteLine("(award_id, sender_user_id, recipient_user_id, type, time, date:)");

            string tsql = Build_6_Tsql_ViewAwards();

            using (var command = new SqlCommand(tsql, connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Console.WriteLine("{0} , {1} , {2} , {3}, {4}, {5}", 
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetInt32(2),
                            (reader.IsDBNull(3)) ? "NULL" : reader.GetString(3),
                            reader.GetTimeSpan(4),
                            reader.GetDateTime(5));
                            //(reader.IsDBNull(4)) ? "NULL" : reader.GetDateTime(4));
                            //(reader.IsDBNull(5)) ? "NULL" : reader.GetDateTime(5));
                    }
                }
            }
        }


        /***********************************
          DISPLAY OUTPUT FUNCTION
        ************************************/
        static void Submit_Tsql_NonQuery(
            SqlConnection connection,
            string tsqlPurpose,
            string tsqlSourceCode,
            string parameterName = null,
            string parameterValue = null
            )
        {
            Console.WriteLine();
            Console.WriteLine("=================================");
            Console.WriteLine("T-SQL to {0}...", tsqlPurpose);

            using (var command = new SqlCommand(tsqlSourceCode, connection))
            {
                if (parameterName != null)
                {
                    command.Parameters.AddWithValue(  // Or, use SqlParameter class.
                        parameterName,
                        parameterValue);
                }
                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine(rowsAffected + " = rows affected.");
            }
        }
    } // EndOfClass
}

