using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace ControleDeCustos.Localization
{
    public static class ControleDeCustosLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(ControleDeCustosConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(ControleDeCustosLocalizationConfigurer).GetAssembly(),
                        "ControleDeCustos.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
