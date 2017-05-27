using System;
using WordsSentence.ServiceContracts;
using WordsSentence.Model;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
using System.IO;
using System.Xml;
using ServiceStack.Text;

namespace WordsSentence.Services
{
    public class TextService : ITextService
    {
        public string CreateCsvFromSentence(string text)
        {
            var csv = string.Empty;
            if (string.IsNullOrWhiteSpace(text)) return csv;

            var model = CreateModel(text);

            csv = ServiceStack.Text.CsvSerializer.SerializeToString(model);

            return csv;
        }

        public string CreateXmlFromSentence(string text)
        {
            var xml = string.Empty;
            if (string.IsNullOrWhiteSpace(text)) return xml;

            var model = CreateModel(text);

            var xsSubmit = new System.Xml.Serialization.XmlSerializer(typeof(Text));
            
            using(var sww = new StringWriter())
            {
                using(var writer = XmlWriter.Create(sww))
                {
                    xsSubmit.Serialize(writer, model);
                    xml = sww.ToString();
                }
            }

            return xml;
        }

        private Text CreateModel(string text)
        {
            text.Replace(',', ' ');

            var model = new Text
            {
                Sentences = new List<Sentence>()
            };

            var sentences = text.Trim().Split('.');

            foreach (var sentence in sentences)
            {
                var modelSentence = new Sentence
                {
                    Words = new List<string>()
                };

                var words = sentence.Trim().Split(' ').OrderBy(s => s);
                foreach (var word in words)
                {
                    modelSentence.Words.Add(word.Trim());
                }
                model.Sentences.Add(modelSentence);
            }

            return model;
        }
    }
}