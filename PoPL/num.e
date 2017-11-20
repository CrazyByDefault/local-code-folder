class
	NUM

create
	make -- The NUM constructor, takes in the size of the string, the base, and the string itself.

feature
	numArray: ARRAY[INTEGER_32] --Stores the individual numbers in the array
	base: INTEGER_32 -- The base of the number
	size: INTEGER_32 -- The size of the input

feature

	make(s: INTEGER; b: INTEGER; n: ARRAY[INTEGER_32])

		require
			size_in_bound: s <= 15
			base_in_bound: b > 0 and b < 17

		local
			i: INTEGER
			x: REAL_64
			temp: INTEGER
			
		do
			size := s
			base := b
			numArray := n

		ensure
			valid_input: across 1 |..| size as t all (numArray.item(t.item) < base and numArray.item(t.item) >= 0) end
		end

	ret_string: STRING
		local
			i: INTEGER
			temp: INTEGER
			numString: STRING -- The decimal representation of the number
		do
			create numString.make_filled('0', size)

			from i := 1 until i > size loop
				if numArray.item(i) < 10
				then
					temp := numArray.item(i) + 48
					numString.put(temp.to_character , i)
				else
					temp := numArray.item(i) + 55
					numString.put(temp.to_character , i)
				end
				i := i + 1
			end

			numString.mirror
			Result := numString
		end

end
