"""Shared image conversion.

Everything the site shows must be sRGB. Camera and retouch exports arrive in
Adobe RGB, ProPhoto and Rec.2020; if those numbers are written out without a
colour-space conversion they render warm and yellow in the browser, because it
assumes sRGB. So convert through the embedded profile rather than dropping it.
"""
from PIL import Image, ImageCms, ImageOps
import io

_SRGB = ImageCms.createProfile('sRGB')


def load_srgb(path):
    """Open an image, honour EXIF rotation, and return it converted to sRGB."""
    im = ImageOps.exif_transpose(Image.open(path))
    icc = im.info.get('icc_profile')
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            im = ImageCms.profileToProfile(im, src, _SRGB, outputMode='RGB')
        except Exception:
            im = im.convert('RGB')      # unreadable profile — best effort
    else:
        im = im.convert('RGB')          # no profile: sRGB is the safe assumption
    if im.mode != 'RGB':
        im = im.convert('RGB')
    return im


def save_web(src, dest, max_px=2200, quality=76):
    im = load_srgb(src)
    im.thumbnail((max_px, max_px), Image.LANCZOS)
    im.save(dest, 'JPEG', quality=quality, subsampling=1, optimize=True,
            icc_profile=ImageCms.ImageCmsProfile(_SRGB).tobytes())
    return dest


def save_thumb(src, dest, max_px=520, quality=68):
    im = load_srgb(src)
    im.thumbnail((max_px, max_px), Image.LANCZOS)
    im.save(dest, 'JPEG', quality=quality, optimize=True)
    return dest
