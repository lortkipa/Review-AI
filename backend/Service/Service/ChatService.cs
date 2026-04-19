using Azure.Core;
using Google.GenAI;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Identity.Client;
using Service.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace Service
{
    public interface IChatService
    {
        Task<ReviewDTO> ReviewCode(string code);
    }

    public class ChatService : IChatService
    {
        private readonly Client _client;
        //private readonly string _model = "gemini-3.1-flash-lite-preview";
        private readonly string _model = "gemini-2.5-flash-lite";

        public ChatService()
        {
            string key = Environment.GetEnvironmentVariable("GEMINI_API_KEY")
                 ?? throw new InvalidOperationException("Environment variable 'GEMINI_API_KEY' is not set.");

            _client = new Client(apiKey: key);
        }

        public async Task<ReviewDTO> ReviewCode(string code)
        {
            var numberedCode = string.Join("\n",
                code.Split('\n')
                .Select((line, index) => $"{index + 1}: {line}")
            );

            string prompt = @$"
                Act as a code analysis engine. Analyze the provided code snippet and return the results strictly as a single, raw JSON object following the schema below.
                
                Scoring Logic:
                    - 'codeQuality' must be an integer between 0 and 100.
                    - 0 represents code that doesn't compile, run or throws exception.
                    - 100 represents almost perfect code (it works and almost nothing can be done to make it better).
                    - Deductions must be proportional: A single 'low' severity issue should only deduct 1-5 points.
                    - Do not drop 'codeQuality' below 90 unless there are multiple issues or high-severity flaws.                    

                Severity Logic:
                    - 'critical':
                      Syntax errors, compilation failures, runtime exceptions, security vulnerabilities (SQL injection, hardcoded secrets), or logic that causes immediate crashes, data loss, or broken program flow.
                      Also includes dependency-related issues where a required function, variable, class, or module is clearly missing and the code cannot function without it.
                    - 'medium':
                      Performance bottlenecks, improper resource management (e.g. missing 'using' / disposals), incorrect or unsafe dependency usage, or logic that works but is fragile, error-prone, or difficult to maintain.
                      Also includes cases where a function, variable, or dependency might exist in another file or context, but is not guaranteed or cannot be confirmed.
                    - 'low':
                        Naming convention violations, redundant or duplicated code, missing documentation, minor stylistic improvements, magic-numbers, unused imports, or non-breaking warnings that do not affect correctness or runtime behavior.

                LINE RULES:
                    - ""lines"" MUST exactly match the numbers shown in the input code.
                    - Do NOT guess line numbers.
                    - If multiple lines are affected, include ALL of them explicitly.
                    - Use ONLY provided line numbers.

                Schema Structure:
                    {{
                        ""language"": ""string"",
                        ""codeQuality"": 50,
                        ""issues"": [
                            {{
                                ""severity"": ""low|medium|critical"",
                                ""title"": ""string"",
                                ""description"": ""string"",
                                ""lines"": [1],
                                ""explanation"": ""string""
                            }}
                        ]
                    }}

                
                OUTPUT FORMAT RULE (STRICT):
                    - Return ONLY a valid JSON object.
                    - Do NOT wrap the output in markdown.
                    - Do NOT use triple backticks (``` or ```json).
                    - Do NOT include explanations, headers, or extra text.
                    - The first character of the response MUST be '{{' and the last character MUST be '}}'.
                    - Any deviation from raw JSON will be considered invalid output.

                Code to analyze (line numbered):
                {numberedCode}
            ";

            var aiResponse = await _client.Models.GenerateContentAsync(model: _model, contents: prompt);

            ReviewDTO review = JsonSerializer.Deserialize<ReviewDTO>(aiResponse.Text, new JsonSerializerOptions{ PropertyNameCaseInsensitive = true });

            return review;
        }
    }
}
