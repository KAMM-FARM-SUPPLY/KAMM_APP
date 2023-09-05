import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


export class Excel{
    static async Export_to_excel(data , type_of_data){
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, type_of_data);
        const wbout = XLSX.write(wb, {
        type: 'base64',
        bookType: "xlsx"
        });
        const uri = FileSystem.cacheDirectory + type_of_data + '.xlsx';
        //console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
        await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64
        });

        await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: type_of_data,
        UTI: 'com.microsoft.excel.xlsx'
        });
    }
}