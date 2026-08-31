using System.Text;
using System.Text.Json;
using EnhanzerAssessment.Api.Models;

namespace EnhanzerAssessment.Api.Services;

public class ExternalApiService
{
    private readonly HttpClient _httpClient;

    public ExternalApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ExternalLoginResponse?> LoginAsync(
        ExternalLoginRequest request)
    {
        var json = JsonSerializer.Serialize(request);

        var content = new StringContent(
            json,
            Encoding.UTF8,
            "application/json");

        var response = await _httpClient.PostAsync(
            "api/External_Api/POS_Api/Invoke",
            content);

        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();

        return JsonSerializer.Deserialize<ExternalLoginResponse>(
            responseJson,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
    }
}