// Options.js
import React from 'react';
import i18next from 'i18next';

const Options = () => {
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        console.log("Selected language:", selectedLanguage); // Log the selected language
        i18next.changeLanguage(selectedLanguage);
    };


    return (
        <div>
            <div className="text-sm">
                <select
                    className="py-1 px-2 rounded-md transition-colors duration-300 "
                    onChange={handleLanguageChange} // Handle language change
                    defaultValue="en" // Default language
                >
                    <option value="en">English</option>
                    <option value="bn">বাংলা</option>
                    <option value="ar">العربية</option>
                    <option value="ur">اُردُو</option>
                    <option value="hi">हिन्दी</option>
                    <option value="zh-CN">中国</option>
                    <option value="es">Español</option>

                </select>
            </div>
        </div>
    );
};

export default Options;
