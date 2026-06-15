#!/bin/bash
mkdir -p apps/

apps=("accounts" "companies" "inventory" "contacts" "transactions")
for app in "${apps[@]}"; do
    if [ -d "$app"]; then
        echo "La aplicacion $app ya existe en apps/, omitiendo..."
    else
        echo "Creando la aplicacion ${app}"
        python manage.py startapp "${app}"

        mv "$app" apps/
    fi
done
echo "Proceso de inicialización de apps terminado."