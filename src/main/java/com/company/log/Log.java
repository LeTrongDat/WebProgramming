package com.company.log;

import com.company.exception.WLException;
import com.company.exception.WebLabException;

import java.io.FileWriter;
import java.io.IOException;

public class Log {
    public static FileWriter logger;

    public static void log(String format, Object... args) {
        try {
            logger = new FileWriter("./log.txt");

            format += "\n";
            for (Object obj : args) {
                if (!format.contains("{}")) throw new WebLabException(WLException.NUMBER_ARGUMENTS_NOT_MATCH_MESSAGE);
                format = format.replaceFirst("\\{}", obj.toString());
            }
            System.out.print(format);

            logger.write(format);
            logger.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

