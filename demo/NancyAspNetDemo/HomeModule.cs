namespace NancyAspNetDemo
{
    using Nancy;

    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            Get["/"] = _ => "Hello World, Nancy in Mac!";
        }
    }
}
