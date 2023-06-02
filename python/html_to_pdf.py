import pdfkit
import sys
import subprocess

options = {
    'page-size': 'Letter',
}


pdf_bytes = pdfkit.from_string(
    sys.argv[1], output_path=sys.argv[2], options=options, verbose=True)
