import pdfkit
import sys
import subprocess


path_wkhtmltopdf = subprocess.run(
    ["which", "wkhtmltopdf"], stdout=subprocess.PIPE, check=True).stdout.decode().strip()
config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)

options = {
    'page-size': 'Letter',
}


pdf_bytes = pdfkit.from_string(
    sys.argv[1], output_path=sys.argv[2], configuration=config, options=options, verbose=True)
