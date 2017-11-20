class
	APPLICATION

create
	make

feature 

         a : STRING
         base_a :INTEGER
         base_b :INTEGER

feature  -- Initialization
	make

		local
        
        -- b : INTEGER
        -- str : STRING
         i: INTEGER
         

      do
         io.read_line
         a := io.last_string
         
         print(a)
         from
         i := 1
         until
         a.item(i) = ' '
         loop
         i := i+1
         end


         print(i)

         base_a :=a.substring (1,i).to_integer
         base_b :=a.substring (i,a.count).to_integer

         print (base_b)
         print (base_a)

      end


end