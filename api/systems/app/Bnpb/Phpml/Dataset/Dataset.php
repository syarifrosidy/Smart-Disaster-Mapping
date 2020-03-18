<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\Dataset;

interface Dataset
{
    public function getSamples(): array;

    public function getTargets(): array;
}
