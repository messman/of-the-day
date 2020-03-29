using System;
using System.Collections.Generic;
using System.Linq;

namespace OfTheDay
{
	public static class StringExtensions
	{
		public static int TryParseInt(this string input, int valueIfNotConverted)
		{
			if (input == null)
			{
				return valueIfNotConverted;
			}
			int value;
			if (Int32.TryParse(input, out value))
			{
				return value;
			}
			return valueIfNotConverted;
		}
	}

	public static class IListExtensions
	{
		public static string ToStringSafe(this IList<object> row, int index)
		{
			return row.ElementAtOrDefault(index)?.ToString();
		}
	}
}