cmake_minimum_required(VERSION 3.20)

# ============================================================
# STM32F4xx CMake 项目模板
# 配合 CubeMX 生成的代码使用
# 使用方法:
#   1. 用 STM32CubeMX 生成 Makefile 项目
#   2. 放到本目录下
#   3. cmake -B build -G "MinGW Makefiles" -DCMAKE_TOOLCHAIN_FILE=arm-none-eabi.cmake
#   4. cmake --build build
# ============================================================

project(stm32f4_app C CXX ASM)

# ---- 芯片型号（按需修改）----
set(STM32_CHIP STM32F407VG)
add_definitions(-D${STM32_CHIP} -DUSE_HAL_DRIVER)

# ---- HAL 库源码 ----
file(GLOB_RECURSE HAL_SOURCES
    Drivers/STM32F4xx_HAL_Driver/Src/*.c
)

# ---- 用户源码 ----
file(GLOB_RECURSE APP_SOURCES
    Core/Src/*.c
    Core/Src/*.cpp
)

# ---- 启动文件 ----
file(GLOB_RECURSE STARTUP_SOURCES
    Core/Startup/startup_stm32f407vgtx.s
)

# ---- 汇编文件 ----
set_source_files_properties(${STARTUP_SOURCES} PROPERTIES LANGUAGE ASM)

# ---- 头文件路径 ----
include_directories(
    Core/Inc
    Drivers/STM32F4xx_HAL_Driver/Inc
    Drivers/STM32F4xx_HAL_Driver/Inc/Legacy
    Drivers/CMSIS/Device/ST/STM32F4xx/Include
    Drivers/CMSIS/Include
)

# ---- 可执行文件 ----
add_executable(${CMAKE_PROJECT_NAME}.elf
    ${APP_SOURCES}
    ${HAL_SOURCES}
    ${STARTUP_SOURCES}
)

# ---- 链接选项 ----
target_link_options(${CMAKE_PROJECT_NAME}.elf PRIVATE
    -T${CMAKE_SOURCE_DIR}/STM32F407VGTx_FLASH.ld
    -Wl,--gc-sections
    -Wl,-Map=${CMAKE_PROJECT_NAME}.map
    --specs=nosys.specs
    --specs=nano.specs
)

# ---- 生成 .bin 和 .hex ----
add_custom_command(TARGET ${CMAKE_PROJECT_NAME}.elf POST_BUILD
    COMMAND ${CMAKE_OBJCOPY} -O binary  ${CMAKE_PROJECT_NAME}.elf ${CMAKE_PROJECT_NAME}.bin
    COMMAND ${CMAKE_OBJCOPY} -O ihex    ${CMAKE_PROJECT_NAME}.elf ${CMAKE_PROJECT_NAME}.hex
    COMMAND ${CMAKE_SIZE} ${CMAKE_PROJECT_NAME}.elf
    COMMENT "Post-build: generating .bin / .hex"
)
