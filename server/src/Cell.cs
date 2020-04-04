namespace OfTheDay
{
	/// <summary>
	/// Signifies a cell of a Google Sheet.
	/// </summary>
	public class Cell
	{
		public Cell(string sheet, char column, int row)
		{
			Sheet = sheet;
			Column = column;
			Row = row;
		}

		/// <summary>
		/// The name of the sheet.
		/// </summary>
		public string Sheet { get; set; }

		/// <summary>
		/// The letter of the column.
		/// </summary>
		public char Column { get; set; }

		/// <summary>
		/// The row number.
		/// </summary>
		public int Row { get; set; }

		/// <summary>
		/// Creates a new cell from what exists.
		/// </summary>
		public Cell Clone()
		{
			return new Cell(Sheet, Column, Row);
		}

		/// <summary>
		/// Transforms the cell into Google Sheets text representation.
		/// </summary>
		public string ToText()
		{
			return $"{Sheet}!{Column}{Row}";
		}

		/// <summary>
		/// Creates a Range, but by adding rows instead of declaring the end row.
		/// </summary>
		public Range ToRangeAdditive(char toColumn, int addRows)
		{
			return ToRange(toColumn, Row + addRows);
		}

		/// <summary>
		/// Creates a Range in the same sheet.
		/// </summary>
		public Range ToRange(char toColumn, int toRow)
		{
			return new Range()
			{
				From = this,
				To = new Cell(Sheet, toColumn, toRow)
			};
		}
	}

	/// <summary>
	/// Represents a range in a Google Sheet.
	/// </summary>
	public class Range
	{
		public Cell From { get; set; }
		public Cell To { get; set; }

		/// <summary>
		/// Creates a text representation of the range for Google Sheets, using the first sheet name.
		/// </summary>
		public string ToText()
		{
			return $"{From.Sheet}!{From.Column}{From.Row}:{To.Column}{To.Row}";
		}
	}
}