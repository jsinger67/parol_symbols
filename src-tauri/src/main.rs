use std::path::PathBuf;

use parol::{left_factor, obtain_grammar_config_from_string, GrammarTypeInfo};

#[tauri::command]
async fn process_grammar(file: String, content: String) -> Result<String, String> {
    let sym_tab_string = get_symbol_table(file, content).await?;
    Ok(sym_tab_string)
}

async fn get_symbol_table(file_name: String, content: String) -> Result<String, String> {
    let mut grammar_config =
        obtain_grammar_config_from_string(&content, false).map_err(|e| e.to_string())?;
    let grammar_name = PathBuf::from(file_name)
        .file_stem()
        .unwrap()
        .to_str()
        .unwrap_or("TestGrammar")
        .replace("-exp", "")
        .replace(['.', '-'], "_");

    let cfg = left_factor(&grammar_config.cfg);
    // Exchange original grammar with transformed one
    grammar_config.update_cfg(cfg);

    let mut type_info = GrammarTypeInfo::try_new(&grammar_name).map_err(|e| e.to_string())?;
    type_info
        .build(&grammar_config)
        .map_err(|e| e.to_string())?;
    let json = serde_json::to_string(type_info.symbol_table()).map_err(|e| e.to_string())?;
    Ok(json)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![process_grammar])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
