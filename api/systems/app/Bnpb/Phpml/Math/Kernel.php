<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\Math;

interface Kernel
{
    /**
     * @param float|array $a
     * @param float|array $b
     *
     * @return float|array
     */
    public function compute($a, $b);
}
