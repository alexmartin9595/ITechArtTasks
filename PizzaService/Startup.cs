using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PizzaService.Startup))]
namespace PizzaService
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
