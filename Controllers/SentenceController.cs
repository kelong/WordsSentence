using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WordsStorage.Controllers
{
    [Route("api/[controller]")]
    public class SentenceController : Controller
    {
        public SentenceController()
        {

        }

        [HttpPost("[action]")]
        public string Save(string data)
        {
            return data;
        }
    }
}
