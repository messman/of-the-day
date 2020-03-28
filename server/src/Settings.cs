using System;

namespace OfTheDay
{
	public class Settings
	{
		#region Constants
		public const string GoogleCredentialsJsonPath = "google-credentials.json";

		#endregion


		#region Keys
		public const string ServiceAccountAddressKey = "GoogleSheetsServiceAccountAddress";
		public const string SheetIDKey = "GoogleSheetsSpreadsheetID";

		/// <summary>
		/// From https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-class-library#environment-variables
		/// </summary>
		public static string GetValue(string key)
		{
			return Environment.GetEnvironmentVariable(key, EnvironmentVariableTarget.Process);
		}
		#endregion
	}
}