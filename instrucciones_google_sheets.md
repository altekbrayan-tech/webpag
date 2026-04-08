# Instrucciones para integrar Google Sheets con tu Formulario

Para que el módulo de "Cotización" envíe automáticamente los datos a un Google Sheet, debes seguir estos pasos:

1. Ve a [Google Sheets](https://docs.google.com/spreadsheets/) y crea una nueva hoja de cálculo.
2. En la fila 1, coloca los nombres exactos de las variables que enviamos en el formulario como encabezados, cada uno en una columna:
   - `A1`: `nombre`
   - `B1`: `email`
   - `C1`: `empresa`
   - `D1`: `servicio`
   - `E1`: `presupuesto`
   - `F1`: `detalles`

3. En el menú superior de Google Sheets, ve a **Extensiones > Apps Script**.
4. Borra el código predeterminado y pega el siguiente script:

```javascript
// Obtiene la hoja activa
var sheetName = 'Hoja 1'; // IMPORTANTE: Cambia esto si el nombre de tu pestaña es diferente
var scriptProp = PropertiesService.getScriptProperties();

function initialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

5. Haz clic en **Guardar** (El icono de disquete).
6. Haz clic en el botón superior **Ejecutar** y ejecuta la función `initialSetup`. Te pedirá permisos, acéptalos.
7. Al completar esto, ve al menú superior derecho **Implementar > Nueva Implementación** (Deploy > New Deployment).
8. Selecciona el tipo de implementación: **Aplicación Web** (Haciendo click en el icono de engranaje).
9. En "Ejecutar como", selecciona **Yo**.
10. En "Quién tiene acceso", selecciona **Cualquier persona**.
11. Haz clic en **Implementar**.
12. Copia la URL de la Aplicación web que te proporcionan (`https://script.google.com/macros/s/.../exec`).

### Integrarlo a la App
Abre el archivo `.env.local` en este repositorio (créalo en la raíz si no existe) y agrega la URL copiada:
```env
NEXT_PUBLIC_GOOGLE_WEBHOOK_URL="TU_URL_COPIADA_AQUÍ"
```

El formulario se enviará automáticamente allí.
