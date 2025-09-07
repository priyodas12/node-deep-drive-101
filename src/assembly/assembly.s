    .section .data
msg:
    .ascii "Hello, World!\n"
len = . - msg             # length of the string

    .section .text
    .global _start

_start:
    # write(1, msg, len)
    mov     $1, %rax       # syscall: write
    mov     $1, %rdi       # file descriptor: stdout
    lea     msg(%rip), %rsi # pointer to message
    mov     $len, %rdx     # length of message
    syscall

    # exit(0)
    mov     $60, %rax      # syscall: exit
    xor     %rdi, %rdi     # status: 0
    syscall
