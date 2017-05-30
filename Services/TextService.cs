using System;
using WordsSentence.ServiceContracts;
using WordsSentence.Model;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Xml;
using System.Text;

namespace WordsSentence.Services
{
    public class TextService : ITextService
    {
        public string CreateCsvFromSentence(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) return string.Empty;

            var model = CreateModel(text);

            if (model == null) return string.Empty;

            var result = new StringBuilder();

            var maxWords = model.Sentences.Max(s => s.Words.Count);

            for (var i = 1; i <= maxWords; i++)
            {
                result.Append($", Word {i}");
            }

            result.AppendLine();

            for (var i = 1; i <= model.Sentences.Count; i++)
            {
                var sentence = model.Sentences[i - 1];
                result.AppendLine($"Sentence {i}, {string.Join(", ", sentence.Words)}");
            }

            return result.ToString().Trim();
        }

        public string CreateXmlFromSentence(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) return string.Empty;

            var model = CreateModel(text);

            if (model == null) return string.Empty;

            var result = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");

            result.AppendLine();
            result.AppendLine("<text>");

            foreach (var sentence in model.Sentences)
            {
                result.AppendLine("<sentence>");

                foreach (var word in sentence.Words)
                {
                    result.AppendLine($"<word>{word}</word>");
                }

                result.AppendLine("</sentence>");
            }

            result.Append("</text>");

            return result.ToString();
        }

        private Text CreateModel(string text)
        {
            text = text.Replace(',', ' ');
            text = text.Replace('\r', ' ');
            text = text.Replace('\n', ' ');

            if (string.IsNullOrWhiteSpace(text)) return null;

            var model = new Text
            {
                Sentences = new List<Sentence>()
            };

            var sentences = text.Trim().Split('.');

            foreach (var sentence in sentences)
            {
                if (string.IsNullOrWhiteSpace(sentence)) continue;

                var modelSentence = new Sentence
                {
                    Words = new List<string>()
                };

                var words = sentence.Trim().Split(' ').OrderBy(s => s);
                foreach (var word in words)
                {
                    if (!string.IsNullOrWhiteSpace(word))
                        modelSentence.Words.Add(word.Trim());
                }
                model.Sentences.Add(modelSentence);
            }

            return model;
        }
    }
}