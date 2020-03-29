namespace OfTheDay
{
	public class Cell
	{
		public Cell(string sheet, char column, int row)
		{
			Sheet = sheet;
			Column = column;
			Row = row;
		}

		public string Sheet { get; set; }
		public char Column { get; set; }
		public int Row { get; set; }

		public string ToText()
		{
			return $"{Sheet}!{Column}{Row}";
		}

		public Range ToRange(char toColumn, int addRows)
		{
			return new Range()
			{
				From = this,
				To = new Cell(Sheet, toColumn, Row + addRows)
			};
		}
	}

	public class Range
	{
		public Cell From { get; set; }
		public Cell To { get; set; }

		public string ToText()
		{
			return $"{From.Sheet}!{From.Column}{From.Row}:{To.Column}{To.Row}";
		}
	}
}