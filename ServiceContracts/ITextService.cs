namespace WordsSentence.ServiceContracts
{
    public interface ITextService
    {
         string CreateXmlFromSentence(string sentence);
         string CreateCsvFromSentence(string sentence);
    }
}