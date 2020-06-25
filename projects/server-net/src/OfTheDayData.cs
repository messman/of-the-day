using System;
using System.Collections.Generic;
using System.Linq;

namespace OfTheDay
{
	public class OfTheDayData
	{
		public KeyVal KeyVal { get; set; }

		public List<string> ChecklistDone { get; set; }
		public List<string> ChecklistToDo { get; set; }

		public List<DailyRecord> DailyRecords { get; set; }
		public List<MusicRecord> MusicRecords { get; set; }
	}

	/// <summary>
	/// Key-value pairs of header information.
	/// </summary>
	public class KeyVal
	{
		/// <summary>
		/// Any important information to share. Stays until cleared on the Google Sheet.
		/// </summary>
		public string ImportantInformation { get; set; }
		/// <summary>
		/// Any bad / error information to share. Stays until cleared on the Google Sheet.
		/// </summary>
		public string BadInformation { get; set; }
		/// <summary>
		/// The Start Date of the year.
		/// </summary>
		public string StartDate { get; set; }
		/// <summary>
		/// What is currently being worked on.
		/// </summary>
		public string WorkingOn { get; set; }
		/// <summary>
		/// What I'm looking forward to.
		/// </summary>
		public string LookingForwardTo { get; set; }

		public static KeyVal FromRows(IList<IList<object>> rows)
		{
			return new KeyVal()
			{
				// Access each by index.
				ImportantInformation = rows.ElementAtOrDefault(0)?.ToStringSafe(1),
				BadInformation = rows.ElementAtOrDefault(1)?.ToStringSafe(1),
				StartDate = rows.ElementAtOrDefault(2)?.ToStringSafe(1),
				WorkingOn = rows.ElementAtOrDefault(3)?.ToStringSafe(1),
				LookingForwardTo = rows.ElementAtOrDefault(4)?.ToStringSafe(1)
			};
		}
	}

	/// <summary>
	/// Common information between Daily and Music records.
	/// </summary>
	public class SharedDayRecord
	{
		/// <summary>
		/// The date as mm/dd/yyyy
		/// </summary>
		public string Day { get; set; }
		/// <summary>
		/// The date as "Mon, Mar 30"
		/// </summary>
		public string DayAsText { get; set; }
		/// <summary>
		/// Day of the year since the start date.
		/// </summary>
		public int DayNumber { get; set; }
		/// <summary>
		/// Any special event of this day.
		/// </summary>
		public string SpecialEvent { get; set; }
	}

	public class DailyRecord : SharedDayRecord
	{
		/// <summary>
		/// My location.
		/// </summary>
		public string Location { get; set; }
		/// <summary>
		/// A special note or description for the day.
		/// </summary>
		public string Note { get; set; }
		/// <summary>
		/// A schedule for the day.
		/// </summary>
		public string Schedule { get; set; }
		/// <summary>
		/// A quote of the day.
		/// </summary>
		public string Quote { get; set; }
		public string QuoteBy { get; set; }
		/// <summary>
		/// A YouTube link of the day.
		/// </summary>
		public string YouTubeLink { get; set; }
		public string YouTubeLinkTitle { get; set; }
		public string YouTubeLinkDescription { get; set; }
		/// <summary>
		/// An end-of-day reflection for the day.
		/// </summary>
		public string HowDidItGo { get; set; }

		public static DailyRecord FromRow(IList<object> row)
		{
			return new DailyRecord()
			{
				Day = row.ToStringSafe(0),
				DayAsText = row.ToStringSafe(1),
				DayNumber = row.ToStringSafe(2).TryParseInt(-1),
				SpecialEvent = row.ToStringSafe(3),

				Location = row.ToStringSafe(4),
				Note = row.ToStringSafe(5),
				Schedule = row.ToStringSafe(6),
				Quote = row.ToStringSafe(7),
				QuoteBy = row.ToStringSafe(8),
				YouTubeLink = row.ToStringSafe(9),
				YouTubeLinkTitle = row.ToStringSafe(10),
				YouTubeLinkDescription = row.ToStringSafe(11),
				HowDidItGo = row.ToStringSafe(12)
			};
		}
	}

	public class MusicRecord : SharedDayRecord
	{
		/// <summary>
		/// Whether this is a favorite / relates to the day.
		/// </summary>
		public bool IsFavorite { get; set; }
		/// <summary>
		/// Title of the song.
		/// </summary>
		public string Title { get; set; }
		/// <summary>
		/// Name of the artist.
		/// </summary>
		public string Artist { get; set; }
		public string SpotifyLink { get; set; }
		public string YouTubeLink { get; set; }
		/// <summary>
		/// If true, the application should show the YouTube link instead of the Spotify link.
		/// </summary>
		public bool IsYouTubePreferred { get; set; }
		/// <summary>
		/// Link to the lyrics on Genius.
		/// </summary>
		public string GeniusLink { get; set; }
		public string Description { get; set; }
		public string Quote { get; set; }

		public static MusicRecord FromRow(IList<object> row)
		{
			return new MusicRecord()
			{
				Day = row.ToStringSafe(0),
				DayAsText = row.ToStringSafe(1),
				DayNumber = row.ToStringSafe(2).TryParseInt(-1),
				SpecialEvent = row.ToStringSafe(3),

				IsFavorite = !string.IsNullOrEmpty(row.ToStringSafe(4)),
				Title = row.ToStringSafe(5),
				Artist = row.ToStringSafe(6),
				SpotifyLink = row.ToStringSafe(7),
				YouTubeLink = row.ToStringSafe(8),
				IsYouTubePreferred = !string.IsNullOrEmpty(row.ToStringSafe(9)),
				GeniusLink = row.ToStringSafe(10),
				Description = row.ToStringSafe(11),
				Quote = row.ToStringSafe(12)
			};
		}
	}
}