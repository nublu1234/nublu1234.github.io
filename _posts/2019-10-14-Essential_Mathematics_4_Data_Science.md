---
layout: post
title:  "Essential Mathematics 4 Data Science"
date:   2019-10-14 00:00:00 +0700
categories: [all, datascience, machinelearning, statistics, math]
---

# Essential Mathematics 4 Data Science  

## Linear Algebra  

### Vector Space  

$$ \text{(1)} \,
\boldsymbol{x}+\boldsymbol{y} = \boldsymbol{y}+\boldsymbol{x}
\\
\text{(2)} \,
\boldsymbol{x}+(\boldsymbol{y} +\boldsymbol{z})= (\boldsymbol{x}+\boldsymbol{y})+\boldsymbol{z}
\\
\text{(3)} \,
\text{There is a unique} \,\, \textbf{zero vector} \,\, \text{such that} \, \boldsymbol{x}+\boldsymbol{0}=\boldsymbol{x}
\\
\text{(4)} \, \text{For each } \boldsymbol{x}, \text{there is a } \textbf{unique} \text{ vector} -\boldsymbol{x}
\\
\text{(5)} \,
1\cdot\boldsymbol{x}=\boldsymbol{x}
\\
\text{(6)} \,
(c_1 c_2) \boldsymbol{x} = c_1 (c_2 \boldsymbol{x})
\\
\text{(7)} \,
c(\boldsymbol{x}+\boldsymbol{y})= c\boldsymbol{x}+c\boldsymbol{y}
\\
\text{(8)} \,
(c_1+c_2)\boldsymbol{y}= c_1\boldsymbol{x}+c_2\boldsymbol{y}
$$  

### Vector space of functions 
 
$$(f_1 + f_2)(x)=f_1(x)+f_2(x)\\ \, \\
(af)x=af(x)$$  


### Linear Map  

$$f(x_1 + x_2)=f(x_1)+f(x_2) \\ \, \\
f(ax)=af(x)$$  


### Bases  

$$
e_k = \begin{bmatrix} 0 \\ \vdots  \\ 0 \\ 1 \\ 0 \\ \vdots  \\ 0 \end{bmatrix} 
\\ \, \\
\boldsymbol{x}=\begin{bmatrix} x_1 \\ x_2  \\  \vdots  \\ x_n \end{bmatrix} 
\\ \, \\
\boldsymbol{x}=\sum_{i=1\cdots n}x_{k}e_{k}
$$  

### Vector & Matrix Multiplication  

$$
\begin{bmatrix} a_{\cdot 1}  & a_{\cdot 2} & \cdots & a_{\cdot n} \end{bmatrix}
\begin{bmatrix} x_{1} \\ x_{2} \\ \vdots \\ x_{n} \end{bmatrix} 
= a_{\cdot 1} x_1 + \cdots  + a_{\cdot n} x_n 
\\ \, \\ 
\begin{bmatrix} a_{\cdot 1}  & a_{\cdot 2} & \cdots & a_{\cdot n} \end{bmatrix}
\begin{bmatrix} x_1 &  y_1 & \cdots & z_1 \\  x_2 &  y_2 & \cdots & z_2 \\ \vdots & \vdots & \ddots  & \vdots \\ x_n & y_n & \cdots & z_n \end{bmatrix}
= \begin{bmatrix} A\boldsymbol{x} & A\boldsymbol{y} & \cdots & A\boldsymbol{z} \end{bmatrix}
$$  

$$\\ \, \\
AB =\begin{bmatrix} a_1 & a_2 \end{bmatrix}
 \begin{bmatrix}b_1^\top \\ b_2^\top\end{bmatrix}=
a_1b_1^\top + a_2b_2^\top$$  


$$
AB=
\begin{bmatrix}
\boxed{
\begin{matrix} 
\, \\ a_1 \\ \,
\end{matrix}
}
\boxed{
\begin{matrix} 
\, \\ a_2 \\ \,
\end{matrix}
}
\end{bmatrix}
\begin{bmatrix}
\boxed{
\begin{matrix} 
\, & b_{1}^{T} & \,
\end{matrix}
}
\\
\boxed{
\begin{matrix} 
\, & b_{2}^{T} & \,
\end{matrix}
}
\end{bmatrix} =
\boxed{
\begin{matrix} 
\, \\ a_1 \\ \,
\end{matrix}
}
\boxed{
\begin{matrix} 
\, & b_{1}^{T} & \,
\end{matrix}
}
+
\boxed{
\begin{matrix} 
\, \\ a_2 \\ \,
\end{matrix}
}
\boxed{
\begin{matrix} 
\, & b_{2}^{T} & \,
\end{matrix}
}
$$  

### Vector & Matrix Calculus  

(1) Scalar to Vector  
$$
\nabla f = 
\frac{\partial f}{\partial {x}} =
\begin{bmatrix}
\dfrac{\partial f}{\partial x_1}\\
\dfrac{\partial f}{\partial x_2}\\
\vdots\\
\dfrac{\partial f}{\partial x_N}\\
\end{bmatrix}
$$  

(2) Linear Model  
$$
f(x) = w^\top x
\\
\downarrow
\\
\nabla f = \frac{\partial {w}^{T}{x}}{\partial {x}} = \frac{\partial {x}^{T}{w}}{\partial {x}} = {w}
$$
(Proof)
$$\dfrac{\partial ({w}^\top {x})}{\partial {x}}=
\begin{bmatrix}
\boxed{\dfrac{\partial ({w}^\top {x})}{\partial x_1}} \\
\boxed{\dfrac{\partial ({w}^\top {x})}{\partial x_2}} \\
\vdots \\
\boxed{\dfrac{\partial ({w}^\top {x})}{\partial x_N}} \\
\end{bmatrix} =
\begin{bmatrix}
\boxed{
\dfrac{\partial (w_1 x_1 + \cancel{w_2 x_2} + \cdots + \cancel{w_N x_N})}{\partial x_1} 
}
\\
\boxed{
\dfrac{\partial (\cancel{w_1 x_1} + w_2 x_2 + \cdots + \cancel{w_N x_N})}{\partial x_1} 
}
\\
\vdots
\\
\boxed{
\dfrac{\partial (\cancel{w_1 x_1} + \cancel{w_2 x_2} + \cdots + w_N x_N)}{\partial x_1} 
}
\end{bmatrix} =
\begin{bmatrix}
w_1 \\
w_2 \\
\vdots \\
w_N \\
\end{bmatrix}
= {w}
$$  

(3) Quadratic Form  
$$
f(x) = x^\top A x
$$$$
\nabla f(x) = \frac{\partial {x}^{T}{A}{x}}{\partial {x}} = ({A} + {A}^{T}){x}
$$
(Proof)
$$\dfrac{\partial ({x}^{T}{A}{x})}{\partial {x}}=
\begin{bmatrix}
\boxed{\dfrac{\partial ({x}^{T}{A}{x})}{\partial x_1}} \\
\boxed{\dfrac{\partial ({x}^{T}{A}{x})}{\partial x_2}} \\
\vdots \\
\boxed{\dfrac{\partial ({x}^{T}{A}{x})}{\partial x_N}} \\
\end{bmatrix}
\\ \,\\
=\begin{bmatrix}
\boxed{\dfrac{\partial (\sum_{i=1}^{N} \sum_{j=1}^{N} a_{ij} x_i x_j)}{\partial x_1}} \\
\boxed{\dfrac{\partial (\sum_{i=1}^{N} \sum_{j=1}^{N} a_{ij} x_i x_j)}{\partial x_2}} \\
\vdots \\
\boxed{\dfrac{\partial (\sum_{i=1}^{N} \sum_{j=1}^{N} a_{ij} x_i x_j)}{\partial x_N}} \\
\end{bmatrix}
\\ \,\\
=\begin{bmatrix}
\boxed{\dfrac{\partial
\left(
\begin{matrix}
a_{11}x_1x_1 &+& a_{12}x_1x_2 &+& \cdots &+& a_{1N}x_1x_N &+ \\
a_{21}x_2x_1 &+& \cancel{a_{22}x_2x_2} &+& \cdots &+& \cancel{a_{2N}x_2x_N} &+ \\
& & \cdots \\
a_{N1}x_Nx_1 &+& \cancel{a_{N2}x_Nx_2} &+& \cdots &+& \cancel{a_{NN}x_Nx_N} &
\end{matrix}
\right)}{\partial x_1} } \\
\boxed{\dfrac{\partial
\left(
\begin{matrix}
\cancel{a_{11}x_1x_1} &+& a_{12}x_1x_2 &+& \cdots &+& \cancel{a_{1N}x_1x_N} &+ \\
a_{21}x_2x_1 &+& a_{22}x_2x_2 &+& \cdots &+& a_{2N}x_2x_N &+ \\
& & \cdots \\
\cancel{a_{N1}x_Nx_1} &+& a_{N2}x_Nx_2 &+& \cdots &+& \cancel{a_{NN}x_Nx_N} &
\end{matrix}
\right)}{\partial x_2}} \\
\vdots \\
\end{bmatrix}
\\ \,\\
=\begin{bmatrix}
\boxed{\begin{matrix}
2a_{11}x_1 &+& a_{12}x_2 &+& \cdots &+& a_{1N}x_N &+& \\
a_{21}x_2 &+& 0 &+& \cdots &+& 0 &+& \\
& & & \cdots & & & & \\
a_{N1}x_N &+& 0 &+& \cdots &+& 0 & &
\end{matrix} } \\
\boxed{\begin{matrix}
0 &+& a_{12}x_2 &+& \cdots &+& 0 &+& \\
a_{21}x_1 &+& 2a_{22}x_2 &+& \cdots &+& a_{2N}x_N &+& \\
& & \cdots & & & & & & \\
0 &+& a_{N2}x_N &+& \cdots &+& 0 & &
\end{matrix} } \\
\vdots \\
\end{bmatrix} 
\\ \,\\
=\begin{bmatrix}
\boxed{\sum_{i=1}^{N} a_{1i} x_i + \sum_{i=1}^{N} a_{i1} x_i} \\
\boxed{\sum_{i=1}^{N} a_{2i} x_i + \sum_{i=1}^{N} a_{i2} x_i} \\
\vdots \\
\boxed{\sum_{i=1}^{N} a_{Ni} x_i + \sum_{i=1}^{N} a_{iN} x_i} \\
\end{bmatrix}
\\ \,\\
=\begin{bmatrix}
\boxed{\sum_{i=1}^{N} a_{1i} x_i} \\
\boxed{\sum_{i=1}^{N} a_{2i} x_i} \\
\vdots \\
\boxed{\sum_{i=1}^{N} a_{Ni} x_i} \\
\end{bmatrix}
+
\begin{bmatrix}
\boxed{\sum_{i=1}^{N} a_{i1} x_i} \\
\boxed{\sum_{i=1}^{N} a_{i2} x_i} \\
\vdots \\
\boxed{\sum_{i=1}^{N} a_{iN} x_i} \\
\end{bmatrix} 
\\ \,\\
={A} {x} + {A}^\top {x}=
({A} + {A}^\top){x}$$  

(4) Vector to Scalar  
$$
{f}(x) =
\begin{bmatrix}
f_1 \\
f_2 \\
\vdots\\
f_M \\
\end{bmatrix}
$$  

$$
\frac{\partial {f}}{\partial x} =
\begin{bmatrix}
\dfrac{\partial f_1}{\partial x} &
\dfrac{\partial f_2}{\partial x} &
\cdots &
\dfrac{\partial f_M}{\partial x}
\end{bmatrix}
$$  

(5) Vector to Vector  

$$
\dfrac{\partial {f}}{\partial {x}}
=\begin{bmatrix}
\dfrac{\partial f_1}{\partial {x}} &
\dfrac{\partial f_2}{\partial {x}} &
\cdots &
\dfrac{\partial f_N}{\partial {x}}
\end{bmatrix}
=\begin{bmatrix}
\dfrac{\partial {f}}{\partial x_1} \\
\dfrac{\partial {f}}{\partial x_2} \\
\vdots \\
\dfrac{\partial {f}}{\partial x_M}
\end{bmatrix}
=\begin{bmatrix}
\dfrac{\partial f_1}{\partial x_1} & \dfrac{\partial f_2}{\partial x_1} & \cdots & \dfrac{\partial f_N}{\partial x_1} \\
\dfrac{\partial f_1}{\partial x_2} & \dfrac{\partial f_2}{\partial x_2} & \cdots & \dfrac{\partial f_N}{\partial x_2} \\
\vdots & \vdots & \ddots & \vdots \\
\dfrac{\partial f_1}{\partial x_M} & \dfrac{\partial f_2}{\partial x_M} & \cdots & \dfrac{\partial f_N}{\partial x_M} \\
\end{bmatrix}
$$  

(6) $Ax$ to Vector  
$$
f(x) = Ax
$$$$
\nabla f(x) = \dfrac{\partial ({Ax})}{\partial {x}} = A^\top
$$  

(Proof)  
$$
{Ax} = {c_1}x_1 + {c_2}x_2 + \cdots + {c_M}x_M
\\ \downarrow \\
\dfrac{\partial ({Ax})}{\partial {x}}
=\begin{bmatrix}
\dfrac{\partial ({Ax})}{\partial x_1} \\
\dfrac{\partial ({Ax})}{\partial x_2} \\
\cdots \\
\dfrac{\partial ({Ax})}{\partial x_M}
\end{bmatrix}
=\begin{bmatrix}
\dfrac{\partial ({c_1}x_1 + {c_2}x_2 + \cdots + {c_M}x_M)^\top}{\partial x_1} \\
\dfrac{\partial ({c_1}x_1 + {c_2}x_2 + \cdots + {c_M}x_M)^\top}{\partial x_2} \\
\cdots \\
\dfrac{\partial ({c_1}x_1 + {c_2}x_2 + \cdots + {c_M}x_M)^\top}{\partial x_M}
\end{bmatrix}
=\begin{bmatrix}
{c_1}^\top \\
{c_2}^\top \\
\cdots \\
{c_M}^\top
\end{bmatrix}
= A^\top
$$  

**Jacobian Matrix**  
**Hessian Matrix**  

(7) Scalar to Matrix  
$$
\dfrac{\partial f}{\partial {X}} =
\begin{bmatrix}
\dfrac{\partial f}{\partial x_{1,1}} & \dfrac{\partial f}{\partial x_{1,2}} & \cdots & \dfrac{\partial f}{\partial x_{1,N}}\\
\dfrac{\partial f}{\partial x_{2,1}} & \dfrac{\partial f}{\partial x_{2,2}} & \cdots & \dfrac{\partial f}{\partial x_{2,N}}\\
\vdots & \vdots & \ddots & \vdots\\
\dfrac{\partial f}{\partial x_{M,1}} & \dfrac{\partial f}{\partial x_{M,2}} & \cdots & \dfrac{\partial f}{\partial x_{M,N}}\\
\end{bmatrix}
$$  

(8) Log of Determinant  
$$
f(X) = \log | {X} |
$$$$
\dfrac{\partial f}{\partial X} = \dfrac{\partial \log | {X} | }{\partial {X}} = ({X}^{-1})^\top
$$  

(Proof)  

$$
\dfrac{\partial}{\partial x_{i,j}} \vert X \vert = C_{i,j}
$$$$
\dfrac{\partial}{\partial X} \vert X \vert = C = | X | (X^{-1})^\top
$$$$
\dfrac{d}{dx} \log f(x) = \dfrac{f'(x)}{f(x)} = \dfrac{\vert X \vert (X^{-1})^\top}{\vert X \vert} = (X^{-1})^\top
$$  

### Linear Map (Linear Transformation)  
A linear map from $V$ to $W$ is a function $T: V \rightarrow W$ with the following properties:  
**additivity**  
$$T(u+v)=T(u)+T(v) \text{ for all} \,u, v \in V$$  
**homogeneity**  
$$T(\lambda v)=\lambda T(v) \text{ for all} \, \lambda \in V \text{ and all} \, v \in V$$  

### Operations  
$$
\text{Transpose: }[A^\top]_{ij} = A_{ji} 
\\ 
\text{Hermitian conjugate: }[A^H]_{ij} = A_{ji} 
\\
\text{Addition: }[A + B]_{ij} = A_{ij} + B_{ij} 
\\
\text{Scalar multiplication: }[aA]_{ij} = aA_{ij} 
\\
\text{Matrix multiplication: }[AB]_{ij} = \sum_{k}A_{ik}B_{kj}
$$  

### Special Matrices  
$$\text{Zero Matrix: }0_{ij}
\\ 
\text{Unit Matrix: } I_n$$  

### Determinant  
$$
det(A) \in R \, (\text{or } C) 
\\
det(S^{-1}AS)=det(A)
\\
det(U)=\prod_{i=1}^n a_{ii} 
\\
det \begin{bmatrix} a_{\cdot 1}   \cdots  a_{\cdot i}  \cdots  a_{\cdot k} \cdots  a_{\cdot n}\end{bmatrix}
= -det \begin{bmatrix} a_{\cdot 1}   \cdots  a_{\cdot k}  \cdots  a_{\cdot i} \cdots  a_{\cdot n}\end{bmatrix}
\\
det(AB)=det(A) \cdot det(B)
\\
\text{The matrix }A \text{ is invertible iff } detA = 0.  \text{ We call such a matrix non-singular.}
$$  
> $U$: Upper Triangle Matrix  

### Minors of a square matrix  
$$
C_{i,j} = (-1)^{i+j}M_{i,j} \\
\det(A) = \sum_{i=1}^N C_{i,j_0} a_{i,j_0}  =  
\sum_{j=1}^N C_{i_0,j} a_{i_0,j}
$$  

> ex)$\begin{bmatrix}
\cancel{1}&2&3\\
\cancel{4}&\cancel{5}&\cancel{6}\\
\cancel{7}&8&9\\
\end{bmatrix}
\;\; \rightarrow \;\;
M_{2,1} = \det \left( \begin{bmatrix}2&3\\8&9\end{bmatrix} \right) 
\\ 
i_0=2, \, j_0=1$  

### Norms on vector spaces  
$$ l_{p}\text{-norm} =\| x\|_{p} = \left[\sum{|x_i|^p}\right] ^{\frac{1}{p}} \,\, (p \geq1)$$  

$$\| x\|_{1} = \sum_{i=1}^{n} |x_i| \\
 \| x\|_{2}  =\left[\sum_{i=1}^{n} |x_i|^2\right] ^{\frac{1}{2}}\\ 
 \| x\|_{\infty}  =\sup_{i=1 \cdots n} (|x_i|)\\
 \| x\|_{\frac{1}{2}} = \left[\sum_{i=1}^{n} |x_i|^{\frac{1}{2}}\right] ^{2}$$  

$\text{a.  }
 \| x \|  \geq 0 
\\
\text{b.  }
\| x \|  = 0  \Leftrightarrow x = 0
\\
\text{c.  }
\| ax \|  = |a|\| x \|
\\
\text{d.  }
\| x - z\|  \geq \| x - y \|  + \| y - z \|$  

### Inner Product  
$$
\langle a , b \rangle=
\begin{bmatrix} a_{1}  & a_{2} & \cdots & a_{ n} \end{bmatrix}
\begin{bmatrix} b_{1} \\ b_{2} \\ \vdots \\ b_{n} \end{bmatrix} 
= \sum_{i=1}^{n}a_i b_i
=\| a \|  \|b  \| \cos{\theta}
$$  

### Cosine Similarity  
$$\cos{\langle a , b \rangle}
= \frac{\langle a , b \rangle}{\| a\|_{2} \| b\|_{2}}
=\frac{
            \sum _{i=1}^{n} a_{i} b_{i} 
            }{
            \sqrt{   \sum _{i=1}^{n}{a_{i}^{2}} }
            \sqrt{   \sum _{i=1}^{n}{b_{i}^{2}} }
             }
$$  
- The greater the value of cosine similarity, the more similar between vectors.  

### Projection Matrix  
$$P = A(A^\top A)^{-1}A^\top$$  

### Eigen value, Eigen vector  
**Eigen value**  
$$\lambda = \{\lambda \,| \, (A-\lambda E)x=0, \, x\ne 0\}$$  
**Eigen vector**  
$$x = \{x \,| \, (A-\lambda E)x=0, \, x\ne 0\}$$  
**Condition for Trivial solution about Eigen vector**  
$$det(A-\lambda E)=0$$  
- This is called **Eigenvalue Equation**.  

### Singular Value Decomposition  
$$A = U\Sigma V^\top$$  

>$\Sigma \in \mathbf{R}^{N \times M}$  
> - $\Sigma$: Diagonal matrix & All diagonal entries are Positive.  
>  
>$U \in \mathbf{R}^{N \times N}$  
> - All column vectors are unit vector & They are each orthogonal.  
>
>$V \in \mathbf{R}^{M \times M}$  
> - All column vectors are unit vector & They are each orthogonal.  

(1) $A A^\top = UD^2 U^\top$,  $A^\top A = VD^2 V^\top$  
(2) $U^\top U = V^\top V =  I_n$  
(3) $A A^\top u_i = \lambda_i u_i \,\, i=1, 2, \cdots ,n$  
(4) $A^\top A v_i = \lambda_i v_i  \,\, i=1, 2, \cdots ,n$  
(5) $D = \begin{bmatrix} \sqrt{\lambda_1} &  0 & \cdots & 0 \\  0 &  \sqrt{\lambda_2} & \cdots & 0 \\ \vdots & \vdots & \ddots  & \vdots \\ 0 & \cdots & 0 & \sqrt{\lambda_n} \end{bmatrix}$  

## Calculus  

### Taylor Series  

### Lagrange Multiplier  
[Move to 'Optimization' page.](#Lagrange-Multiplier)  

## Mathematical Statistics  

### Maximum Likelihood Estimation  
$$L(\theta)=L(\theta ; x_1, x_2, \cdots , x_n)=f(x_1, x_2, \cdots , x_n ; \theta) 
\\
\downarrow \text{ iid}
\\
\prod _{i=1}^{n}{ f(x_i ; \theta) } = f(x_1 ; \theta)f(x_2 ; \theta) \cdots f(x_n ; \theta)
\\
\downarrow \text{to find the maximum value of MLE (1)}
\\
\log{ L(\theta ; x_1, x_2, \cdots , x_n) }= \log{\prod _{i=1}^{n}{ f(x_i ; \theta) } } = \sum_{i=1}^{n} \log{f(x_i ; \theta)}
\\
\downarrow \text{to find the maximum value of MLE (2)}
\\ \frac{d}{d \theta} \log{L(\theta ; x_1, x_2, \cdots , x_n)} = 0
$$  
- **Maximum Likelihood Estimator** $\hat{\theta}=\{\hat{\theta} | \frac{d}{d \theta} \log{L(\theta ; x_1, x_2, \cdots , x_n)} = 0\}$  

### Least Squared Method  
$$D = \sum_{}^{} {e_{i}^{2}} = e^\top e=(y-Xb)^\top (y-Xb) 
\\
=y^\top y - y^\top Xb - b^\top X^\top y + b^\top X^\top Xb$$

$$\frac{\partial D}{\partial b} = -2X^\top y + 2X^\top Xb = 0
\\
\downarrow
\\X^\top y = X^\top Xb \Rightarrow b=X(X^\top X)^{-1}X^\top y$$  

## Optimization  

### Steepest Gradient Descent  
$$x_{k+1} = x_{k} - \mu \nabla f(x_k) = x_{k} - \mu g(x_k)$$  
> $\nabla f(x_k)$: Gradient Vector  
> $\mu$: Step Size  

### Constrained Optimization  
$$
x^{\ast} = \text{arg} \min_x f(x)
\,\,\,\,
(x \in \mathbf{R}^N)
$$  

$$
\text{Constraints Condition : } \,\,
g_j(x) = 0 \;\; (j=1, \ldots, M)
$$  
### Lagrange Multiplier  

$$
h(x_1, x_2, \ldots , x_N, \lambda_1, \ldots , \lambda_M) \\
f(x) + \sum_{j=1}^M \lambda_j g_j(x) 
\\ \Downarrow
\\
\dfrac{\partial h}{\partial x_1} 
= \dfrac{\partial f}{\partial x_1} + \sum_{j=1}^M \lambda_j\dfrac{\partial g_j}{\partial x_1} = 0 \\
\dfrac{\partial h}{\partial x_2} 
= \dfrac{\partial f}{\partial x_2} + \sum_{j=1}^M \lambda_j\dfrac{\partial g_j}{\partial x_2} = 0 \\
 \vdots  \\
\dfrac{\partial h}{\partial x_N} 
= \dfrac{\partial f}{\partial x_N} + \sum_{j=1}^M \lambda_j\dfrac{\partial g_j}{\partial x_N} = 0 \\
\dfrac{\partial h}{\partial \lambda_1} 
= g_1 = 0 \\
 \vdots  \\
\dfrac{\partial h}{\partial \lambda_M} 
= g_M = 0
$$  
- Vector to make objective function small: $x_{i}^{*}$  
___
---
### *End Of Document*  
Please let me know if there are any parts not included.  
It written by [StackEdit](https://stackedit.io/)  


