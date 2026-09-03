from rembg import remove
from PIL import Image

input_path = r'C:\Users\Иван\Next\ivan\public\images\product\categories\vulkan\vulkan1.jpg'
output_path = 'boss11.webp'

# Открываем изображение
input_image = Image.open(input_path)

# Удаляем фон
output_image = remove(input_image)

# Сохраняем в WebP
output_image.save(output_path, "WEBP", quality=80)
