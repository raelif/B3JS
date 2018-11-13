# Move files from Downloads/
if test -f ~/Downloads/blocks.js; then
	mv ~/Downloads/blocks.js ./src/blocks.js
fi
if test -f ~/Downloads/blocks_code.js; then
	mv ~/Downloads/blocks_code.js ./src/blocks_code.js
fi
if test -f ~/Downloads/toolbox.xml; then
	mv ~/Downloads/toolbox.xml ./src/toolbox.xml
fi

# Run html on Google Chrome with Python server
server=($(pgrep python3))
if test -z ${server[0]}; then
	python3 -m http.server &
fi

chrome=m
open -a "Google Chrome" http://localhost:8000/b3js.html

# Quit Google Chrome => Shut down server
while test -n ${chrome[0]}; do
	chrome=($(pgrep "Google Chrome"))
	if test -z ${chrome[0]}; then
		killall python3
		break
	fi
	sleep 5
done
