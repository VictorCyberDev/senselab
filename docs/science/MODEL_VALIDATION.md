# Scientific model validation

All outputs are deterministic simulations, not physical measurements.

## Thermal physics
`ΔT = Q/(mc)` and `T_final = T_initial + ΔT`. Units: joules, kilograms, J kg⁻¹ °C⁻¹ and °C. Reference capacities: water 4184, aluminium 897, iron 449. Assumes no phase change, heat loss or container capacity. Test: 4184 J into 1 kg water raises temperature 1 °C.

## Ideal DC circuit
`I = V/R` and `P = VI`. Units: V, Ω, A and W. Assumes an ideal resistor, steady DC and no internal resistance or thermal effect. Test: 12 V across 6 Ω produces 2 A and 24 W.

## Constant-acceleration motion
`x = ut + ½at²` and `v = u + at`. Assumes one dimension, constant acceleration, a point object and no drag. Test: rest at 2 m/s² for 5 s produces 25 m and 10 m/s.

## Logistic population
`P(t) = K/(1 + ((K-P₀)/P₀)e^(-rt))`. Assumes a closed population with constant capacity and growth rate, continuous time and no age structure. The interface requires `0 < P₀ < K`; the series approaches `K`.

References: OpenStax [University Physics 1](https://openstax.org/details/books/university-physics-volume-1), [University Physics 2](https://openstax.org/details/books/university-physics-volume-2), and [Biology 2e](https://openstax.org/details/books/biology-2e). Automated checks are in `tests/science.test.js`.
