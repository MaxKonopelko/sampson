using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;

namespace MyEngine.Models
{
    public class MyСonverter
    {
        //метод предназначен для преобразования стоимости в объявлениях к боллее читабельному виду
        public string ValueSpaceConvert(int value)
        {
            NumberFormatInfo nfi = new CultureInfo("en-US", false).NumberFormat;
            nfi.NumberGroupSeparator = " ";

            return value.ToString("#,#",nfi);
        }
        /*---------------------------------------------------------------------------------*/
    }
}