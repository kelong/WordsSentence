using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WordsSentence.Model;
using WordsSentence.ServiceContracts;

namespace WordsStorage.Controllers
{
    [Route("api/[controller]")]
    public class SentenceController : Controller
    {
        private readonly ITextService _textService;
        public SentenceController(ITextService textService)
        {
            _textService = textService;
        }

        [HttpPost("[action]")]
        public IActionResult GenerateXmlFromText([FromBody]TextToConvert textToConvert)
        {
            if (textToConvert == null)
                throw new ArgumentNullException(nameof(TextToConvert));

            return Ok(new {
                Data = _textService.CreateXmlFromSentence(textToConvert.Data)
            });
        }

        [HttpPost("[action]")]
        public IActionResult GenerateCsvFromText([FromBody]TextToConvert textToConvert)
        {
            if (textToConvert == null)
                throw new ArgumentNullException(nameof(TextToConvert));

            return Ok(new {
                Data = _textService.CreateCsvFromSentence(textToConvert.Data)
            });
        }
    }
}
