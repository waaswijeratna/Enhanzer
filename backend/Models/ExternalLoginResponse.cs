using System.Text.Json.Serialization;

namespace EnhanzerAssessment.Api.Models;

public class ExternalLoginResponse
{
    [JsonPropertyName("Status_Code")]
    public int Status_Code { get; set; }

    [JsonPropertyName("Sync_Time")]
    public string Sync_Time { get; set; } = "";

    [JsonPropertyName("Message")]
    public string Message { get; set; } = "";

    [JsonPropertyName("Response_Body")]
    public List<LoginResponseBody>? Response_Body { get; set; }
}

public class LoginResponseBody
{
    [JsonPropertyName("User_Code")]
    public string User_Code { get; set; } = "";

    [JsonPropertyName("User_Display_Name")]
    public string User_Display_Name { get; set; } = "";

    [JsonPropertyName("Email")]
    public string Email { get; set; } = "";

    [JsonPropertyName("Company_Code")]
    public string Company_Code { get; set; } = "";

    [JsonPropertyName("Doc_Msg")]
    public string? Doc_Msg { get; set; }

    [JsonPropertyName("User_Locations")]
    public List<ExternalLocation> User_Locations { get; set; } = new();
}

public class ExternalLocation
{
    [JsonPropertyName("Location_Code")]
    public string Location_Code { get; set; } = "";

    [JsonPropertyName("Location_Name")]
    public string Location_Name { get; set; } = "";
}