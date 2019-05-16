var global_language = JSON.parse(localStorage.getItem('lan'));
if (global_language === null)
	global_language = 'en';
localStorage.setItem('lan', JSON.stringify(global_language));

var lang_elem = document.getElementById('language');
if (lang_elem)
	document.head.removeChild(lang_elem);

lang_elem = document.createElement('script');
lang_elem.setAttribute('id', 'language');
lang_elem.setAttribute('lang', global_language);
lang_elem.setAttribute('type', 'text/javascript');
lang_elem.setAttribute('src', 'lib/msg/js/' + global_language + '.js');

document.head.appendChild(lang_elem);

const tr_lang = {
	en : {
		file : 'File',
		saveButton : 'Save Project',
		importButton : 'Import Project',
		genButton : 'Generate Javascript',
		uploadButton : 'Upload Resources',
		demo : 'Demo',
		playDemo : 'Play Demo',
		showMsg : 'Show Message',
		startOver : 'Start Over',
		exitDemo : 'Exit from Demo',
		view : 'View',
		canvEnlButton : 'Canvas Fullscreen',
		wrksEnlButton : 'Workspace Fullscreen',
		languageButton : 'Language:\
			Eng <input id="enLan" type="radio" name="lan" onclick="changeLanguage(this)" value="en" checked="checked">\
			Ita <input id="itLan" type="radio" name="lan" onclick="changeLanguage(this)" value="it">',
		showButton : 'Show Code',
		stopButton : 'Stop',
		runButton : 'Run',
		advance : 'ADVANCE',
		congrats : 'Congratulation you have cleared this level!'
	},
	it : {
		file : 'File',
		saveButton : 'Salva Progetto',
		importButton : 'Importa Progetto',
		genButton : 'Genera Javascript',
		uploadButton : 'Carica Risorse',
		demo : 'Demo',
		playDemo : 'Gioca Demo',
		showMsg : 'Mostra Messaggio',
		startOver : 'Ricomincia',
		exitDemo : 'Esci dalla Demo',
		view : 'Vista',
		canvEnlButton : 'Canvas a Schermo Intero',
		wrksEnlButton : 'Workspace a Schermo Intero',
		languageButton : 'Lingua:\
			Eng <input id="enLan" type="radio" name="lan" onclick="changeLanguage(this)" value="en">\
			Ita <input id="itLan" type="radio" name="lan" onclick="changeLanguage(this)" value="it" checked="checked">',
		showButton : 'Mostra Codice',
		stopButton : 'Ferma',
		runButton : 'Esegui',
		advance : 'AVANZA',
		congrats : 'Congratulazioni hai completato questo livello!'
	}
};
