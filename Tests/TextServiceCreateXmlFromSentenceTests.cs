using System;
using System.Text;
using WordsSentence.ServiceContracts;
using WordsSentence.Services;
using Xunit;

namespace WordsSentence.Tests
{
    public class TextServiceCreateXmlFromSentenceTests : IDisposable
    {
        private ITextService _textService;
        private StringBuilder _expectedResult;

        public TextServiceCreateXmlFromSentenceTests()
        {
            _textService = new TextService();
            _expectedResult = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
        }

        [Fact]
        public void WhenParameterIsNull_ThenCreateXmlFromSentenceReturnsEmptyString()
        {
            var result = _textService.CreateXmlFromSentence(null);

            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void WhenParameterIsEmpty_ThenCreateXmlFromSentenceReturnsEmptyString()
        {
            var result = _textService.CreateXmlFromSentence(string.Empty);

            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void WhenParameterHasComma_ThenCreateXmlFromSentenceReturnsEmptyString()
        {
            var result = _textService.CreateXmlFromSentence(",");

            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void WhenParameterHasWhiteSpace_ThenCreateXmlFromSentenceReturnsEmptyString()
        {
            var result = _textService.CreateXmlFromSentence("   ");

            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void WhenParameterHasOneSentenceWithOneWord_ThenCreateXmlFromSentenceReturnsAccordingly()
        {
            var result = _textService.CreateXmlFromSentence("myWord");

            Assert.Equal($@"{_expectedResult}{Environment.NewLine}<text>{Environment.NewLine}<sentence>{Environment.NewLine}<word>myWord</word>{Environment.NewLine}</sentence>{Environment.NewLine}</text>", result);
        }

        [Fact]
        public void WhenParameterHasTwoSentencesWithTwoWords_ThenCreateXmlFromSentenceReturnsAccordingly()
        {
            var result = _textService.CreateXmlFromSentence("myWord. myWord2");

            Assert.Equal($@"{_expectedResult}{Environment.NewLine}<text>{Environment.NewLine}<sentence>{Environment.NewLine}<word>myWord</word>{Environment.NewLine}</sentence>{Environment.NewLine}<sentence>{Environment.NewLine}<word>myWord2</word>{Environment.NewLine}</sentence>{Environment.NewLine}</text>", result);
        }

        [Fact]
        public void WhenParameterIsCorrect_ThenCreateXmlFromSentenceReturnsAccordingly()
        {
            var param = @"  Mary   had a little  lamb  . 


  Peter   called for the wolf   ,  and Aesop came .
 Cinderella  likes shoes.";

            var result = _textService.CreateXmlFromSentence(param);

            var expectedResult = $"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>{Environment.NewLine}<text>{Environment.NewLine}<sentence>{Environment.NewLine}<word>a</word>{Environment.NewLine}<word>had</word>{Environment.NewLine}<word>lamb</word>{Environment.NewLine}<word>little</word>{Environment.NewLine}<word>Mary</word>{Environment.NewLine}</sentence>{Environment.NewLine}<sentence>{Environment.NewLine}<word>Aesop</word>{Environment.NewLine}<word>and</word>{Environment.NewLine}<word>called</word>{Environment.NewLine}<word>came</word>{Environment.NewLine}<word>for</word>{Environment.NewLine}<word>Peter</word>{Environment.NewLine}<word>the</word>{Environment.NewLine}<word>wolf</word>{Environment.NewLine}</sentence>{Environment.NewLine}<sentence>{Environment.NewLine}<word>Cinderella</word>{Environment.NewLine}<word>likes</word>{Environment.NewLine}<word>shoes</word>{Environment.NewLine}</sentence>{Environment.NewLine}</text>";

            Assert.Equal(expectedResult, result);
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _textService = null;
                    _expectedResult = null;
                }
                
                disposedValue = true;
            }
        }
        
        void IDisposable.Dispose()
        {
            Dispose(true);
        }
        #endregion
    }
}