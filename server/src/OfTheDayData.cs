using System;
using System.Collections.Generic;
using System.Linq;

namespace OfTheDay
{
	public class OfTheDayData
	{
		public KeyVal KeyVal { get; set; }
		// public List<ChecklistRecord> ChecklistRecords { get; set; }
		// public DailyRecord Yesterday { get; set; }
		// public DailyRecord Today { get; set; }
		// public MusicRecord TodayMusic { get; set; }
		// public List<MusicRecord> MusicRecords { get; set; }
	}

	public class KeyVal
	{
		public DateTime StartDate { get; set; }
		public string GoalOfTheWeek { get; set; }
		public string LookingForwardTo { get; set; }
	}

	public class ChecklistRecord
	{
		public bool IsComplete { get; set; }
		public string Name { get; set; }
	}

	public class SharedDayRecord
	{
		public string Day { get; set; }
		public string DayAsText { get; set; }
		public int DayNumber { get; set; }
		public string SpecialEvent { get; set; }
	}

	public class DailyRecord : SharedDayRecord
	{
		public string Location { get; set; }
		public string Note { get; set; }
		public string Schedule { get; set; }
		public string Quote { get; set; }
		public string QuoteBy { get; set; }
		public string YouTubeLink { get; set; }
		public string YouTubeLinkTitle { get; set; }
		public string YouTubeLinkDescription { get; set; }
		public string HowDidItGo { get; set; }
	}

	public class MusicRecord : SharedDayRecord
	{
		public bool IsFavorite { get; set; }
		public string Title { get; set; }
		public string Artist { get; set; }
		public string SpotifyLink { get; set; }
		public string YouTubeLink { get; set; }
		public bool IsYouTubePreferred { get; set; }
		public string GeniusLink { get; set; }
		public string Description { get; set; }
		public string Quote { get; set; }

		public static MusicRecord FromRow(object row)
		{
			string[] rowArray = ((IList<object>)row).Select(x => x.ToString()).ToArray();
			return new MusicRecord()
			{
				Day = rowArray.ElementAtOrDefault(0),
				DayAsText = rowArray.ElementAtOrDefault(1),
				DayNumber = rowArray.ElementAtOrDefault(2).TryParse(-1),
				SpecialEvent = rowArray.ElementAtOrDefault(3),

				IsFavorite = !string.IsNullOrEmpty(rowArray.ElementAtOrDefault(4)),
				Title = rowArray.ElementAtOrDefault(5),
				Artist = rowArray.ElementAtOrDefault(6),
				SpotifyLink = rowArray.ElementAtOrDefault(7),
				YouTubeLink = rowArray.ElementAtOrDefault(8),
				IsYouTubePreferred = !string.IsNullOrEmpty(rowArray.ElementAtOrDefault(9)),
				GeniusLink = rowArray.ElementAtOrDefault(10),
				Description = rowArray.ElementAtOrDefault(11),
				Quote = rowArray.ElementAtOrDefault(12)
			};
		}
	}
}