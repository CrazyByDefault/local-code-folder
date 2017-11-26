	.file	"QS_random.c"
# GNU C11 (Ubuntu 5.4.0-6ubuntu1~16.04.5) version 5.4.0 20160609 (x86_64-linux-gnu)
#	compiled by GNU C version 5.4.0 20160609, GMP version 6.1.0, MPFR version 3.1.4, MPC version 1.0.3
# GGC heuristics: --param ggc-min-expand=100 --param ggc-min-heapsize=131072
# options passed:  -imultiarch x86_64-linux-gnu QS_random.c -mtune=generic
# -march=x86-64 -fverbose-asm -fstack-protector-strong -Wformat
# -Wformat-security
# options enabled:  -faggressive-loop-optimizations
# -fasynchronous-unwind-tables -fauto-inc-dec -fchkp-check-incomplete-type
# -fchkp-check-read -fchkp-check-write -fchkp-instrument-calls
# -fchkp-narrow-bounds -fchkp-optimize -fchkp-store-bounds
# -fchkp-use-static-bounds -fchkp-use-static-const-bounds
# -fchkp-use-wrappers -fcommon -fdelete-null-pointer-checks
# -fdwarf2-cfi-asm -fearly-inlining -feliminate-unused-debug-types
# -ffunction-cse -fgcse-lm -fgnu-runtime -fgnu-unique -fident
# -finline-atomics -fira-hoist-pressure -fira-share-save-slots
# -fira-share-spill-slots -fivopts -fkeep-static-consts
# -fleading-underscore -flifetime-dse -flto-odr-type-merging -fmath-errno
# -fmerge-debug-strings -fpeephole -fprefetch-loop-arrays
# -freg-struct-return -fsched-critical-path-heuristic
# -fsched-dep-count-heuristic -fsched-group-heuristic -fsched-interblock
# -fsched-last-insn-heuristic -fsched-rank-heuristic -fsched-spec
# -fsched-spec-insn-heuristic -fsched-stalled-insns-dep -fschedule-fusion
# -fsemantic-interposition -fshow-column -fsigned-zeros
# -fsplit-ivs-in-unroller -fstack-protector-strong -fstdarg-opt
# -fstrict-volatile-bitfields -fsync-libcalls -ftrapping-math
# -ftree-coalesce-vars -ftree-cselim -ftree-forwprop -ftree-loop-if-convert
# -ftree-loop-im -ftree-loop-ivcanon -ftree-loop-optimize
# -ftree-parallelize-loops= -ftree-phiprop -ftree-reassoc -ftree-scev-cprop
# -funit-at-a-time -funwind-tables -fverbose-asm -fzero-initialized-in-bss
# -m128bit-long-double -m64 -m80387 -malign-stringops
# -mavx256-split-unaligned-load -mavx256-split-unaligned-store
# -mfancy-math-387 -mfp-ret-in-387 -mfxsr -mglibc -mieee-fp
# -mlong-double-80 -mmmx -mno-sse4 -mpush-args -mred-zone -msse -msse2
# -mtls-direct-seg-refs -mvzeroupper

	.comm	samplesFile,8,8
	.comm	outputFile,8,8
	.comm	randOutput,8,8
	.text
	.type	quicksort.3105, @function
quicksort.3105:
.LFB3:
	.cfi_startproc
	pushq	%rbp	#
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp	#,
	.cfi_def_cfa_register 6
	pushq	%rbx	#
	subq	$56, %rsp	#,
	.cfi_offset 3, -24
	movl	%edi, -52(%rbp)	# first, first
	movl	%esi, -56(%rbp)	# last, last
	movq	%r10, %rbx	# CHAIN.16, CHAIN.16
	movq	%r10, -64(%rbp)	# CHAIN.16,
	movq	%fs:40, %rax	#, tmp181
	movq	%rax, -24(%rbp)	# tmp181, D.3281
	xorl	%eax, %eax	# tmp181
	movl	32(%rbx), %eax	# CHAIN.16_8(D)->depth, D.3278
	addl	$1, %eax	#, D.3278
	movl	%eax, 32(%rbx)	# D.3278, CHAIN.16_8(D)->depth
	movl	-52(%rbp), %eax	# first, tmp122
	cmpl	-56(%rbp), %eax	# last, tmp122
	jge	.L12	#,
	movl	-52(%rbp), %eax	# first, tmp123
	movl	%eax, -44(%rbp)	# tmp123, lo
	movl	-56(%rbp), %eax	# last, tmp124
	movl	%eax, -40(%rbp)	# tmp124, hi
	movl	32(%rbx), %edx	# CHAIN.16_8(D)->depth, D.3278
	movq	8(%rbx), %rax	# CHAIN.16_8(D)->randomint.4, D.3279
	movslq	%edx, %rdx	# D.3278, tmp125
	movl	(%rax,%rdx,4), %eax	# *_17, tmp126
	movl	%eax, -36(%rbp)	# tmp126, pivot
	movl	32(%rbx), %edx	# CHAIN.16_8(D)->depth, D.3278
	movq	8(%rbx), %rax	# CHAIN.16_8(D)->randomint.4, D.3279
	movslq	%edx, %rdx	# D.3278, tmp127
	movl	(%rax,%rdx,4), %eax	# *_20, D.3278
	movl	-56(%rbp), %edx	# last, tmp128
	movl	%edx, %ecx	# tmp128, D.3278
	subl	-52(%rbp), %ecx	# first, D.3278
	cltd
	idivl	%ecx	# D.3278
	movl	-52(%rbp), %eax	# first, tmp134
	addl	%edx, %eax	# D.3278, tmp133
	movl	%eax, -36(%rbp)	# tmp133, pivot
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-36(%rbp), %edx	# pivot, tmp136
	movslq	%edx, %rdx	# tmp136, tmp135
	movl	(%rax,%rdx,4), %eax	# *_25, tmp137
	movl	%eax, -32(%rbp)	# tmp137, x
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-40(%rbp), %edx	# hi, tmp139
	movslq	%edx, %rdx	# tmp139, tmp138
	movl	(%rax,%rdx,4), %ecx	# *_27, D.3278
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-36(%rbp), %edx	# pivot, tmp141
	movslq	%edx, %rdx	# tmp141, tmp140
	movl	%ecx, (%rax,%rdx,4)	# D.3278, *_29
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-40(%rbp), %edx	# hi, tmp143
	movslq	%edx, %rdx	# tmp143, tmp142
	movl	-32(%rbp), %ecx	# x, tmp144
	movl	%ecx, (%rax,%rdx,4)	# tmp144, *_31
	jmp	.L3	#
.L6:
	addl	$1, -44(%rbp)	#, lo
.L4:
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-44(%rbp), %edx	# lo, tmp146
	movslq	%edx, %rdx	# tmp146, tmp145
	movl	(%rax,%rdx,4), %ecx	# *_33, D.3278
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-36(%rbp), %edx	# pivot, tmp148
	movslq	%edx, %rdx	# tmp148, tmp147
	movl	(%rax,%rdx,4), %eax	# *_35, D.3278
	cmpl	%eax, %ecx	# D.3278, D.3278
	jge	.L7	#,
	movl	-44(%rbp), %eax	# lo, tmp149
	cmpl	-40(%rbp), %eax	# hi, tmp149
	jl	.L6	#,
	jmp	.L7	#
.L9:
	subl	$1, -40(%rbp)	#, hi
.L7:
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-40(%rbp), %edx	# hi, tmp151
	movslq	%edx, %rdx	# tmp151, tmp150
	movl	(%rax,%rdx,4), %ecx	# *_38, D.3278
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-36(%rbp), %edx	# pivot, tmp153
	movslq	%edx, %rdx	# tmp153, tmp152
	movl	(%rax,%rdx,4), %eax	# *_40, D.3278
	cmpl	%eax, %ecx	# D.3278, D.3278
	jl	.L8	#,
	movl	-40(%rbp), %eax	# hi, tmp154
	cmpl	-44(%rbp), %eax	# lo, tmp154
	jg	.L9	#,
.L8:
	movl	-44(%rbp), %eax	# lo, tmp155
	cmpl	-40(%rbp), %eax	# hi, tmp155
	jge	.L3	#,
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-40(%rbp), %edx	# hi, tmp157
	movslq	%edx, %rdx	# tmp157, tmp156
	movl	(%rax,%rdx,4), %eax	# *_43, tmp158
	movl	%eax, -28(%rbp)	# tmp158, x
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-44(%rbp), %edx	# lo, tmp160
	movslq	%edx, %rdx	# tmp160, tmp159
	movl	(%rax,%rdx,4), %ecx	# *_45, D.3278
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-40(%rbp), %edx	# hi, tmp162
	movslq	%edx, %rdx	# tmp162, tmp161
	movl	%ecx, (%rax,%rdx,4)	# D.3278, *_47
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-44(%rbp), %edx	# lo, tmp164
	movslq	%edx, %rdx	# tmp164, tmp163
	movl	-28(%rbp), %ecx	# x, tmp165
	movl	%ecx, (%rax,%rdx,4)	# tmp165, *_49
.L3:
	movl	-44(%rbp), %eax	# lo, tmp166
	cmpl	-40(%rbp), %eax	# hi, tmp166
	jl	.L4	#,
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-40(%rbp), %edx	# hi, tmp168
	movslq	%edx, %rdx	# tmp168, tmp167
	movl	(%rax,%rdx,4), %eax	# *_51, tmp169
	movl	%eax, -32(%rbp)	# tmp169, x
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-36(%rbp), %edx	# pivot, tmp171
	movslq	%edx, %rdx	# tmp171, tmp170
	movl	(%rax,%rdx,4), %ecx	# *_53, D.3278
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-40(%rbp), %edx	# hi, tmp173
	movslq	%edx, %rdx	# tmp173, tmp172
	movl	%ecx, (%rax,%rdx,4)	# D.3278, *_55
	movq	(%rbx), %rax	# CHAIN.16_8(D)->array.6, D.3280
	movl	-36(%rbp), %edx	# pivot, tmp175
	movslq	%edx, %rdx	# tmp175, tmp174
	movl	-32(%rbp), %ecx	# x, tmp176
	movl	%ecx, (%rax,%rdx,4)	# tmp176, *_57
	movl	-40(%rbp), %eax	# hi, tmp177
	leal	-1(%rax), %edx	#, D.3278
	movl	-52(%rbp), %eax	# first, tmp178
	movq	%rbx, %r10	# CHAIN.16,
	movl	%edx, %esi	# D.3278,
	movl	%eax, %edi	# tmp178,
	call	quicksort.3105	#
	movl	-40(%rbp), %eax	# hi, tmp179
	leal	1(%rax), %edx	#, D.3278
	movl	-56(%rbp), %eax	# last, tmp180
	movq	%rbx, %r10	# CHAIN.16,
	movl	%eax, %esi	# tmp180,
	movl	%edx, %edi	# D.3278,
	call	quicksort.3105	#
.L12:
	nop
	movq	-24(%rbp), %rax	# D.3281, tmp182
	xorq	%fs:40, %rax	#, tmp182
	je	.L11	#,
	call	__stack_chk_fail	#
.L11:
	addq	$56, %rsp	#,
	popq	%rbx	#
	popq	%rbp	#
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE3:
	.size	quicksort.3105, .-quicksort.3105
	.section	.rodata
.LC0:
	.string	"r"
.LC1:
	.string	"samples.txt"
.LC2:
	.string	"w"
.LC3:
	.string	"output2.txt"
.LC4:
	.string	"randoms.txt"
.LC7:
	.string	"%f\n"
	.text
	.globl	main
	.type	main, @function
main:
.LFB2:
	.cfi_startproc
	pushq	%rbp	#
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp	#,
	.cfi_def_cfa_register 6
	pushq	%r15	#
	pushq	%r14	#
	pushq	%r13	#
	pushq	%r12	#
	pushq	%rbx	#
	subq	$232, %rsp	#,
	.cfi_offset 15, -24
	.cfi_offset 14, -32
	.cfi_offset 13, -40
	.cfi_offset 12, -48
	.cfi_offset 3, -56
	movl	%edi, -196(%rbp)	# argc, argc
	movq	%rsi, -208(%rbp)	# argv, argv
	movq	%fs:40, %rax	#, tmp259
	movq	%rax, -56(%rbp)	# tmp259, D.3299
	xorl	%eax, %eax	# tmp259
	movq	%rsp, %rax	#, tmp169
	movq	%rax, %rbx	# tmp169, D.3285
	movq	-208(%rbp), %rax	# argv, tmp170
	addq	$8, %rax	#, D.3286
	movq	(%rax), %rax	# *_11, D.3287
	movq	%rax, %rdi	# D.3287,
	call	atoi	#
	movl	%eax, -176(%rbp)	# tmp171, n
	movq	-208(%rbp), %rax	# argv, tmp172
	addq	$16, %rax	#, D.3286
	movq	(%rax), %rax	# *_14, D.3287
	movq	%rax, %rdi	# D.3287,
	call	atoi	#
	movl	%eax, -172(%rbp)	# tmp173, sample_size
	movl	$.LC0, %esi	#,
	movl	$.LC1, %edi	#,
	call	fopen	#
	movq	%rax, samplesFile(%rip)	# D.3288, samplesFile
	movl	$.LC2, %esi	#,
	movl	$.LC3, %edi	#,
	call	fopen	#
	movq	%rax, outputFile(%rip)	# D.3288, outputFile
	movl	$.LC2, %esi	#,
	movl	$.LC4, %edi	#,
	call	fopen	#
	movq	%rax, randOutput(%rip)	# D.3288, randOutput
	movl	-176(%rbp), %edx	# n, D.3289
	movslq	%edx, %rax	# D.3289, D.3290
	subq	$1, %rax	#, D.3290
	movq	%rax, -88(%rbp)	# D.3291, FRAME.15.D.3230
	movslq	%edx, %rax	# D.3289, D.3291
	movq	%rax, -224(%rbp)	# D.3291, %sfp
	movq	$0, -216(%rbp)	#, %sfp
	movslq	%edx, %rax	# D.3289, D.3291
	movq	%rax, -240(%rbp)	# D.3291, %sfp
	movq	$0, -232(%rbp)	#, %sfp
	movslq	%edx, %rax	# D.3289, D.3291
	salq	$2, %rax	#, D.3291
	leaq	3(%rax), %rdx	#, tmp174
	movl	$16, %eax	#, tmp253
	subq	$1, %rax	#, tmp175
	addq	%rdx, %rax	# tmp174, tmp176
	movl	$16, %ecx	#, tmp254
	movl	$0, %edx	#, tmp179
	divq	%rcx	# tmp254
	imulq	$16, %rax, %rax	#, tmp178, tmp180
	subq	%rax, %rsp	# tmp180,
	movq	%rsp, %rax	#, tmp181
	addq	$3, %rax	#, tmp182
	shrq	$2, %rax	#, tmp183
	salq	$2, %rax	#, tmp184
	movq	%rax, -104(%rbp)	# D.3293, FRAME.15.randomint.4
	movl	-176(%rbp), %eax	# n, D.3289
	movslq	%eax, %rdx	# D.3289, D.3290
	subq	$1, %rdx	#, D.3290
	movq	%rdx, -96(%rbp)	# D.3291, FRAME.15.D.3232
	movslq	%eax, %rdx	# D.3289, D.3291
	movq	%rdx, -256(%rbp)	# D.3291, %sfp
	movq	$0, -248(%rbp)	#, %sfp
	movslq	%eax, %rdx	# D.3289, D.3291
	movq	%rdx, -272(%rbp)	# D.3291, %sfp
	movq	$0, -264(%rbp)	#, %sfp
	cltq
	salq	$2, %rax	#, D.3291
	leaq	3(%rax), %rdx	#, tmp185
	movl	$16, %eax	#, tmp255
	subq	$1, %rax	#, tmp186
	addq	%rdx, %rax	# tmp185, tmp187
	movl	$16, %ecx	#, tmp256
	movl	$0, %edx	#, tmp190
	divq	%rcx	# tmp256
	imulq	$16, %rax, %rax	#, tmp189, tmp191
	subq	%rax, %rsp	# tmp191,
	movq	%rsp, %rax	#, tmp192
	addq	$3, %rax	#, tmp193
	shrq	$2, %rax	#, tmp194
	salq	$2, %rax	#, tmp195
	movq	%rax, -112(%rbp)	# D.3294, FRAME.15.array.6
	movl	-176(%rbp), %edx	# n, tmp196
	movl	%edx, %eax	# tmp196, tmp197
	addl	%eax, %eax	# tmp197
	addl	%edx, %eax	# tmp196, D.3289
	movslq	%eax, %rdx	# D.3289, D.3290
	subq	$1, %rdx	#, D.3290
	movq	%rdx, -160(%rbp)	# D.3290, D.3169
	movslq	%eax, %rdx	# D.3289, D.3291
	movq	%rdx, %r14	# D.3291, D.3292
	movl	$0, %r15d	#, D.3292
	movslq	%eax, %rdx	# D.3289, D.3291
	movq	%rdx, %r12	# D.3291, D.3292
	movl	$0, %r13d	#, D.3292
	cltq
	movl	$16, %edx	#, tmp257
	subq	$1, %rdx	#, tmp198
	addq	%rdx, %rax	# tmp198, tmp199
	movl	$16, %ecx	#, tmp258
	movl	$0, %edx	#, tmp202
	divq	%rcx	# tmp258
	imulq	$16, %rax, %rax	#, tmp201, tmp203
	subq	%rax, %rsp	# tmp203,
	movq	%rsp, %rax	#, tmp204
	addq	$0, %rax	#, tmp205
	movq	%rax, -152(%rbp)	# tmp205, line.7
	movl	$0, %eax	#, D.3289
	movl	%eax, -80(%rbp)	# D.3289, FRAME.15.depth
	call	clock	#
	movq	%rax, -144(%rbp)	# tmp206, start_t
	leaq	-168(%rbp), %rax	#, tmp207
	movq	%rax, %rdi	# tmp207,
	call	time	#
	movl	%eax, %edi	# D.3295,
	call	srand	#
	movl	$0, -184(%rbp)	#, i
	jmp	.L14	#
.L15:
	call	rand	#
	movl	%eax, %ecx	#, D.3289
	movq	-104(%rbp), %rax	# FRAME.15.randomint.4, D.3293
	movl	-184(%rbp), %edx	# i, tmp209
	movslq	%edx, %rdx	# tmp209, tmp208
	movl	%ecx, (%rax,%rdx,4)	# D.3289, *_87
	addl	$1, -184(%rbp)	#, i
.L14:
	movl	-184(%rbp), %eax	# i, tmp210
	cmpl	-176(%rbp), %eax	# n, tmp210
	jl	.L15	#,
	call	clock	#
	movq	%rax, -136(%rbp)	# tmp211, end_t
	movq	-136(%rbp), %rax	# end_t, tmp212
	subq	-144(%rbp), %rax	# start_t, D.3290
	pxor	%xmm0, %xmm0	# D.3296
	cvtsi2sdq	%rax, %xmm0	# D.3290, D.3296
	movsd	.LC5(%rip), %xmm1	#, tmp214
	divsd	%xmm1, %xmm0	# tmp214, tmp213
	movsd	%xmm0, -128(%rbp)	# tmp213, rand_gen_t
	movsd	-128(%rbp), %xmm1	# rand_gen_t, tmp216
	movsd	.LC6(%rip), %xmm0	#, tmp217
	mulsd	%xmm1, %xmm0	# tmp216, tmp215
	movsd	%xmm0, -128(%rbp)	# tmp215, rand_gen_t
	movl	$0, -184(%rbp)	#, i
	jmp	.L16	#
.L19:
	movq	samplesFile(%rip), %rcx	# samplesFile, D.3288
	movl	-176(%rbp), %edx	# n, tmp218
	movl	%edx, %eax	# tmp218, tmp219
	addl	%eax, %eax	# tmp219
	leal	(%rax,%rdx), %esi	#, D.3289
	movq	-152(%rbp), %rax	# line.7, D.3297
	movq	%rcx, %rdx	# D.3288,
	movq	%rax, %rdi	# D.3297,
	call	fgets	#
	movl	$0, -180(%rbp)	#, j
	jmp	.L17	#
.L18:
	movl	-180(%rbp), %edx	# j, tmp220
	movl	%edx, %eax	# tmp220, tmp221
	addl	%eax, %eax	# tmp221
	addl	%edx, %eax	# tmp220, D.3289
	movq	-152(%rbp), %rdx	# line.7, tmp222
	cltq
	movzbl	(%rdx,%rax), %eax	# *line.7_75, D.3298
	movb	%al, -64(%rbp)	# D.3298, element
	movl	-180(%rbp), %edx	# j, tmp224
	movl	%edx, %eax	# tmp224, tmp225
	addl	%eax, %eax	# tmp225
	addl	%edx, %eax	# tmp224, D.3289
	addl	$1, %eax	#, D.3289
	movq	-152(%rbp), %rdx	# line.7, tmp226
	cltq
	movzbl	(%rdx,%rax), %eax	# *line.7_75, D.3298
	movb	%al, -63(%rbp)	# D.3298, element
	movl	-180(%rbp), %edx	# j, tmp228
	movl	%edx, %eax	# tmp228, tmp229
	addl	%eax, %eax	# tmp229
	addl	%edx, %eax	# tmp228, D.3289
	addl	$2, %eax	#, D.3289
	movq	-152(%rbp), %rdx	# line.7, tmp230
	cltq
	movzbl	(%rdx,%rax), %eax	# *line.7_75, D.3298
	movb	%al, -62(%rbp)	# D.3298, element
	leaq	-64(%rbp), %rax	#, tmp232
	movq	%rax, %rdi	# tmp232,
	call	atoi	#
	movl	%eax, %ecx	#, D.3289
	movq	-112(%rbp), %rax	# FRAME.15.array.6, D.3294
	movl	-180(%rbp), %edx	# j, tmp234
	movslq	%edx, %rdx	# tmp234, tmp233
	movl	%ecx, (%rax,%rdx,4)	# D.3289, *_114
	addl	$1, -180(%rbp)	#, j
.L17:
	movl	-180(%rbp), %eax	# j, tmp235
	cmpl	-176(%rbp), %eax	# n, tmp235
	jl	.L18	#,
	movq	samplesFile(%rip), %rcx	# samplesFile, D.3288
	movl	-176(%rbp), %edx	# n, tmp236
	movl	%edx, %eax	# tmp236, tmp237
	addl	%eax, %eax	# tmp237
	leal	(%rax,%rdx), %esi	#, D.3289
	movq	-152(%rbp), %rax	# line.7, D.3297
	movq	%rcx, %rdx	# D.3288,
	movq	%rax, %rdi	# D.3297,
	call	fgets	#
	movq	-152(%rbp), %rax	# line.7, tmp238
	movb	$0, (%rax)	#, *line.7_75
	call	clock	#
	movq	%rax, -144(%rbp)	# tmp239, start_t
	movl	$0, %eax	#, D.3289
	movl	%eax, -80(%rbp)	# D.3289, FRAME.15.depth
	movl	-176(%rbp), %eax	# n, tmp240
	subl	$1, %eax	#, D.3289
	leaq	-112(%rbp), %rdx	#, tmp241
	movq	%rdx, %r10	# tmp241,
	movl	%eax, %esi	# D.3289,
	movl	$0, %edi	#,
	call	quicksort.3105	#
	call	clock	#
	movq	%rax, -136(%rbp)	# tmp242, end_t
	movq	-136(%rbp), %rax	# end_t, tmp243
	subq	-144(%rbp), %rax	# start_t, D.3290
	pxor	%xmm0, %xmm0	# D.3296
	cvtsi2sdq	%rax, %xmm0	# D.3290, D.3296
	movsd	.LC5(%rip), %xmm1	#, tmp245
	divsd	%xmm1, %xmm0	# tmp245, tmp244
	movsd	%xmm0, -120(%rbp)	# tmp244, t
	movsd	-120(%rbp), %xmm1	# t, tmp247
	movsd	.LC6(%rip), %xmm0	#, tmp248
	mulsd	%xmm1, %xmm0	# tmp247, tmp246
	movsd	%xmm0, -120(%rbp)	# tmp246, t
	movq	outputFile(%rip), %rax	# outputFile, D.3288
	movq	-120(%rbp), %rdx	# t, tmp249
	movq	%rdx, -224(%rbp)	# tmp249, %sfp
	movsd	-224(%rbp), %xmm0	# %sfp,
	movl	$.LC7, %esi	#,
	movq	%rax, %rdi	# D.3288,
	movl	$1, %eax	#,
	call	fprintf	#
	movq	randOutput(%rip), %rax	# randOutput, D.3288
	movq	-128(%rbp), %rdx	# rand_gen_t, tmp250
	movq	%rdx, -224(%rbp)	# tmp250, %sfp
	movsd	-224(%rbp), %xmm0	# %sfp,
	movl	$.LC7, %esi	#,
	movq	%rax, %rdi	# D.3288,
	movl	$1, %eax	#,
	call	fprintf	#
	addl	$1, -184(%rbp)	#, i
.L16:
	movl	-184(%rbp), %eax	# i, tmp251
	cmpl	-172(%rbp), %eax	# sample_size, tmp251
	jl	.L19	#,
	movq	outputFile(%rip), %rax	# outputFile, D.3288
	movq	%rax, %rdi	# D.3288,
	call	fclose	#
	movq	randOutput(%rip), %rax	# randOutput, D.3288
	movq	%rax, %rdi	# D.3288,
	call	fclose	#
	movq	%rbx, %rsp	# D.3285,
	movl	$0, %eax	#, D.3289
	movq	-56(%rbp), %rbx	# D.3299, tmp260
	xorq	%fs:40, %rbx	#, tmp260
	je	.L21	#,
	call	__stack_chk_fail	#
.L21:
	leaq	-40(%rbp), %rsp	#,
	popq	%rbx	#
	popq	%r12	#
	popq	%r13	#
	popq	%r14	#
	popq	%r15	#
	popq	%rbp	#
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE2:
	.size	main, .-main
	.section	.rodata
	.align 8
.LC5:
	.long	0
	.long	1093567616
	.align 8
.LC6:
	.long	0
	.long	1083129856
	.ident	"GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.5) 5.4.0 20160609"
	.section	.note.GNU-stack,"",@progbits
