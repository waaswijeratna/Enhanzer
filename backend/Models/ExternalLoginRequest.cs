namespace EnhanzerAssessment.Api.Models;

public class ExternalLoginRequest
{
    public string API_Action { get; set; } = "GetLoginData";

    public string Device_Id { get; set; } = "D001";

    public string Sync_Time { get; set; } = "";

    public string Company_Code { get; set; } = "";

    public ExternalLoginBody API_Body { get; set; } = new();
}

public class ExternalLoginBody
{
    public string Username { get; set; } = "";

    public string Pw { get; set; } = "";
}