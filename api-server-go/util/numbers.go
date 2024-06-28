package util

import "strconv"

func StringToUInt(s string) (uint, error) {
	num, err := strconv.ParseUint(s, 10, 32)
	if err != nil {
		return 0, err
	}
	return uint(num), nil
}
