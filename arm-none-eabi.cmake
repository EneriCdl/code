# CMake toolchain file for ARM Cortex-M (STM32)
# Usage: cmake -B build -DCMAKE_TOOLCHAIN_FILE=arm-none-eabi.cmake

set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR arm)

# ---- ARM GNU Toolchain Path ----
set(TOOLCHAIN_ROOT "C:/Users/xuzhi/arm-toolchain/arm-gnu-toolchain-13.3.rel1-mingw-w64-i686-arm-none-eabi")

set(CMAKE_C_COMPILER    "${TOOLCHAIN_ROOT}/bin/arm-none-eabi-gcc.exe")
set(CMAKE_CXX_COMPILER  "${TOOLCHAIN_ROOT}/bin/arm-none-eabi-g++.exe")
set(CMAKE_ASM_COMPILER  "${TOOLCHAIN_ROOT}/bin/arm-none-eabi-gcc.exe")
set(CMAKE_OBJCOPY       "${TOOLCHAIN_ROOT}/bin/arm-none-eabi-objcopy.exe" CACHE INTERNAL "objcopy")
set(CMAKE_OBJDUMP       "${TOOLCHAIN_ROOT}/bin/arm-none-eabi-objdump.exe" CACHE INTERNAL "objdump")
set(CMAKE_SIZE          "${TOOLCHAIN_ROOT}/bin/arm-none-eabi-size.exe" CACHE INTERNAL "size")

set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)

# ---- Common flags ----
set(CPU_FLAGS "-mcpu=cortex-m4 -mthumb -mfloat-abi=hard -mfpu=fpv4-sp-d16")
set(CMAKE_C_FLAGS   "${CPU_FLAGS} -Wall -Wextra -fdata-sections -ffunction-sections" CACHE INTERNAL "")
set(CMAKE_CXX_FLAGS "${CPU_FLAGS} -Wall -Wextra -fdata-sections -ffunction-sections -fno-exceptions -fno-rtti" CACHE INTERNAL "")
set(CMAKE_ASM_FLAGS "${CPU_FLAGS}" CACHE INTERNAL "")
set(CMAKE_EXE_LINKER_FLAGS "-T${CMAKE_SOURCE_DIR}/STM32F407VGTx_FLASH.ld -Wl,--gc-sections -Wl,-Map=${CMAKE_PROJECT_NAME}.map --specs=nosys.specs --specs=nano.specs" CACHE INTERNAL "")
