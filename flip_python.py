from PIL import Image
import os
import glob

assets_dir = 'assets'
# Find all the active -final images being used
files = glob.glob(os.path.join(assets_dir, '*-final.webp'))
# Also get the original ones just in case
all_files = glob.glob(os.path.join(assets_dir, '*.webp'))

# Let's just rotate EVERY WebP file in the assets folder!
flipped_count = 0
for file_path in all_files:
    try:
        with Image.open(file_path) as img:
            # Rotate 180 degrees
            rotated_img = img.rotate(180, expand=True)
            # Remove EXIF
            data = list(rotated_img.getdata())
            image_without_exif = Image.new(rotated_img.mode, rotated_img.size)
            image_without_exif.putdata(data)
            # Save back
            image_without_exif.save(file_path, 'WEBP')
        flipped_count += 1
        print(f'Flipped {os.path.basename(file_path)}')
    except Exception as e:
        print(f'Error on {file_path}: {e}')

print(f'Done! Flipped {flipped_count} images.')
