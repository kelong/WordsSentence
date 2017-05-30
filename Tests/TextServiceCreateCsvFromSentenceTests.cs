using System;
using Moq;
using WordsSentence.ServiceContracts;
using WordsSentence.Services;
using Xunit;

namespace Tests
{
    public class TextServiceCreateCsvFromSentenceTests : IDisposable
    {
        private ITextService _textService;

        public TextServiceCreateCsvFromSentenceTests()
        {
            _textService = new TextService();
        }

        [Fact]
        public void WhenParameterIsNull_ThenCreateCsvFromSentenceReturnsEmptyString()
        {
            var result = _textService.CreateCsvFromSentence(null);

            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void WhenParameterIsEmpty_ThenCreateCsvFromSentenceReturnsEmptyString()
        {
            var result = _textService.CreateCsvFromSentence(string.Empty);

            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void WhenParameterHasComma_ThenCreateCsvFromSentenceReturnsEmptyString()
        {
            var result = _textService.CreateCsvFromSentence(",");

            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void WhenParameterHasWhiteSpace_ThenCreateCsvFromSentenceReturnsEmptyString()
        {
            var result = _textService.CreateCsvFromSentence("   ");

            Assert.Equal(string.Empty, result);
        }

        [Fact]
        public void WhenParameterHasOneSentenceWithOneWord_ThenCreateCsvFromSentenceReturnsAccordingly()
        {
            var result = _textService.CreateCsvFromSentence("myWord");

            Assert.Equal($@", Word 1{Environment.NewLine}Sentence 1, myWord", result);
        }

        [Fact]
        public void WhenParameterHasTwoSentencesWithTwoWords_ThenCreateCsvFromSentenceReturnsAccordingly()
        {
            var result = _textService.CreateCsvFromSentence("myWord. myWord2");

            Assert.Equal($@", Word 1{Environment.NewLine}Sentence 1, myWord{Environment.NewLine}Sentence 2, myWord2", result);
        }

        [Fact]
        public void WhenParameterIsCorrect_ThenCreateCsvFromSentenceReturnsAccordingly()
        {
            var param = @"  Mary   had a little  lamb  . 


  Peter   called for the wolf   ,  and Aesop came .
 Cinderella  likes shoes.";

            var result = _textService.CreateCsvFromSentence(param);

            var expectedResult = $@", Word 1, Word 2, Word 3, Word 4, Word 5, Word 6, Word 7, Word 8{Environment.NewLine}Sentence 1, a, had, lamb, little, Mary{Environment.NewLine}Sentence 2, Aesop, and, called, came, for, Peter, the, wolf{Environment.NewLine}Sentence 3, Cinderella, likes, shoes";

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
