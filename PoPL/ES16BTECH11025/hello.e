class
	APPLICATION
create
	make

feature
	number: NUM
	i_base: INTEGER
	f_base: INTEGER

feature
	make
		local
			input: STRING
			i: INTEGER
			n: STRING
			numArray: ARRAY[INTEGER_32]
			size: INTEGER
		do
			io.read_line
			input := io.last_string

			from
				i := 1
			until
				input.item(i) = ' '
			loop
				i := i + 1
			end

			i_base := input.substring(1, i).to_integer
			f_base := input.substring(i, input.count).to_integer

			io.read_integer
			size := io.last_integer

			io.read_line
			n := io.last_string
			n.mirror -- Mirror string so that the first digit is at the first index position.

			create numArray.make(1, size);

			from
				i := 1
			until
				i > n.count
			loop
				if n.item(i).is_digit = true
				then
					numArray.put((n.item(i).code - 48), i)
				else
					numArray.put((n.item(i).code - 55), i)
				end
				i := i + 1
			end

			create number.make(size, i_base, numArray)
			io.put_string(convert_final.ret_string)
			
		rescue
			io.put_string("INVALID")

		end

	convert_final: NUM
		do
			Result := convert_to_base(convert_to_decimal(number), f_base)
		end
			

	convert_to_decimal(i_num: NUM): NUM
		local
			f_num: NUM
			i: INTEGER
			temp_r: REAL_64
			temp_i: INTEGER
			f_numArray: ARRAY[INTEGER_32]

		do
			create f_numArray.make(1, 15)
			from i := 1 until i > i_num.size loop
				temp_r := temp_r + i_num.numArray.item(i) * (i_num.base^(i-1))
				i := i + 1
			end
			temp_i := temp_r.truncated_to_integer
		
			

			from i := 1 until temp_i = 0 loop
				f_numArray.put(temp_i\\10, i)
				temp_i := temp_i//10
				i := i + 1
			end

			create f_num.make(i, 10, f_numArray)

			Result := f_num

		end

	convert_to_base(i_num: NUM; b: INTEGER): NUM
		local
			f_num: NUM
			i: INTEGER
			temp_r: REAL_64
			temp_i: INTEGER
			f_numArray: ARRAY[INTEGER_32]

		do
			create f_numArray.make(1, 15)
			from i := 1 until i > i_num.size loop
				temp_r := temp_r + i_num.numArray.item(i) * (i_num.base^(i-1))
				i := i + 1
			end
			temp_i := temp_r.truncated_to_integer

			

			from i := 1 until temp_i = 0 loop
				f_numArray.put(temp_i\\b, i)
				temp_i := temp_i//b
				i := i + 1
			end

			create f_num.make(i-1, b, f_numArray)

			Result := f_num

		end
end -- class APPLICATION
