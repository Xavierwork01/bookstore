using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models
{
    public interface IDataBaseSettings
    {
        string ConnectionString { get; set; }
        string DataBaseName { get; set; }
    }

    public class DataBaseSettings : IDataBaseSettings
    {
        public string ConnectionString { get; set; }
        public string DataBaseName { get; set; }
    }
}
