# Código desarrollado por @gata_dios
# Editado y mejorado por Dev-Fedexyz13

#!/data/data/com.termux/files/usr/bin/bash

BOT_DIR="Kaoruko"
BOT_REPO="https://github.com/Dev-fedexyz13/$BOT_DIR"
DB_FILE="datos.json"

GREEN='\033[32m'
BOLD='\033[1m'
RESET='\033[0m'

function log() {
  echo -e "${BOLD}${GREEN}$1${RESET}"
}

function install_bot() {
  cd && rm -rf "$BOT_DIR"
  git clone "$BOT_REPO"
  cd "$BOT_DIR"
  yarn --ignore-scripts
  npm install
}

function start_bot() {
  cd "$BOT_DIR"
  npm start
}

function restore_db() {
  if [ -e "$HOME/$DB_FILE" ]; then
    log "📁 Restaurando \"$DB_FILE\" en \"$BOT_DIR\"..."
    mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/"
  fi
}

if [[ $(basename "$PWD") == "$BOT_DIR" ]]; then
  if [ -e "$DB_FILE" ]; then
    log "🔄 Moviendo \"$DB_FILE\" a \"$HOME\" y reinstalando \"$BOT_DIR\"..."
    mv "$HOME/$BOT_DIR/$DB_FILE" "$HOME"
    install_bot
    restore_db
    log "🚀 Iniciando $BOT_DIR..."
    start_bot
  else
    log "⚠️ \"$DB_FILE\" no encontrado en \"$BOT_DIR\". Reinstalando..."
    install_bot
    restore_db
    log "🚀 Iniciando $BOT_DIR..."
    start_bot
  fi
else
  cd "$HOME"
  if [ -d "$BOT_DIR" ]; then
    log "📂 Accediendo a \"$BOT_DIR\"..."
    cd "$BOT_DIR"
    if [ -e "$DB_FILE" ]; then
      log "🔄 Moviendo \"$DB_FILE\" a \"$HOME\" y reinstalando \"$BOT_DIR\"..."
      mv "$HOME/$BOT_DIR/$DB_FILE" "$HOME"
      install_bot
      restore_db
      log "🚀 Iniciando $BOT_DIR..."
      start_bot
    else
      log "⚠️ \"$DB_FILE\" no encontrado. Reinstalando..."
      install_bot
      log "🚀 Iniciando $BOT_DIR..."
      start_bot
    fi
  else
    log "📥 Clonando \"$BOT_REPO\" en \"$HOME\"..."
    install_bot
    restore_db
    log "🚀 Iniciando $BOT_DIR..."
    start_bot
  fi
